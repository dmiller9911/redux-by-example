import glamorous, { Div, Span, withTheme } from 'glamorous';
import * as React from 'react';
import { ThemedProps } from 'styles/theme';
import { JSONSchema, SchemaType } from 'types/AppSchema';
import { BooleanValue, ConstantValue, Ellipsis, JSONKey, NumberValue, StringValue } from './code';

interface Props {
  name: string;
  node: JSONSchema;
}

interface State {
  isExpanded: boolean;
}

export class Node extends React.Component<Props, State> {
  public state: State = {
    isExpanded: false,
  };

  public render(): any {
    const { node, name } = this.props;
    const schemaProps = node.patternProperties || node.properties;
    const canExpand = !!(schemaProps || node.items);

    return (
      <div>
        <div onClick={canExpand ? this.handleLineClick : undefined}>
          <Div
            cursor={canExpand ? 'pointer' : 'initial'}
            onClick={(canExpand ? this.handleLineClick : undefined) as any}
          >
            <Expander>
              {canExpand && (this.state.isExpanded ? '-' : '+')}
            </Expander>
            <JSONKey>{name}</JSONKey>
            {!this.state.isExpanded && <TypeValue node={node} />}
          </Div>
        </div>
        {this.state.isExpanded && (
          <>
            {!!schemaProps && (
              <div style={{ paddingLeft: 15 }}>
                {Object.keys(schemaProps).length ? Object.keys(schemaProps).map((k) => (
                    <Node key={k} name={k} node={schemaProps[k]} />
                  )) : <EmptyObject />}
              </div>
            )}
            {!!node.items && (
              <div style={{ paddingLeft: 15 }}>
                <Node name='0' node={node.items} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  public handleLineClick = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }
}

const EmptyObject = glamorous.span<ThemedProps>(({ theme }) => ({
  fontSize: '0.75rem',
  fontStyle: 'italic',
  color: theme.code.note,
}))
.withProps(() => ({ children: `'Empty Object'` }));

const Expander = glamorous.span<ThemedProps>({
  marginRight: 5,
  width: 10,
  display: 'inline-block',
}, ({ theme }) => ({
  color: theme.code.expander,
}));

type NodeMap = {
  [K in SchemaType]: React.SFC<{ node: JSONSchema }>;
};

const Special00 = glamorous.span<ThemedProps>(({ theme }) => ({
  color: theme.code.object,
}));

const ObjectNode = glamorous.span<ThemedProps>(({ theme }) => ({
  color: theme.code.object,
}))
.withProps(() => ({
  children: (
    <>
      {'{'}<Ellipsis />{'}'}
    </>
  ),
}));

const nodeMap: NodeMap = {
  string: ({ node }) => <StringValue>{node.type}</StringValue>,
  number: ({ node }) => <NumberValue>{node.type}</NumberValue>,
  undefined: ({ node }) => <ConstantValue>{node.type}</ConstantValue>,
  null: ({ node }) => <ConstantValue>{node.type}</ConstantValue>,
  boolean: ({ node }) => <BooleanValue>{node.type}</BooleanValue>,
  object: ObjectNode as any,
  array: () => <Special00>[<Ellipsis />]</Special00>,
};

const TypeValue: React.SFC<{ node: JSONSchema }> = ({ node }) => {
  const Component = nodeMap[node.type];
  if (!Component) {
    return <span>{node.type}</span>;
  }
  return <Component node={node} />;
};

// function getTypeLabel(node: JSONSchema) {
//   if (node.isImmutable) {
//     const immutableType = node.immutableType;
//     let genericDecl = '';
//     if (node.patternProperties) {
//       const keyDecl = Object.keys(node.patternProperties)[0];
//       const typeDecl = node.patternProperties[keyDecl].type;
//       genericDecl = `<${keyDecl}, ${typeDecl}>`;
//     }
//     if (immutableType.includes('_')) {
//       const [first, second] = immutableType.split('_');
//       const firstFormated = first[0].toUpperCase() + first.slice(1);
//       const secondFormated = second[0].toUpperCase() + second.slice(1);
//       return 'immutable.' + firstFormated + secondFormated + genericDecl + '()';
//     }
//     return 'immutable.' + immutableType[0].toUpperCase() + immutableType.slice(1)  + genericDecl + '()';
//   }
//   if (node.type === 'object') {
//     const props = node.patternProperties || node.properties || {};
//     return Object.keys(props).length ? '{...}' : '{}';
//   }
//   if (node.type === 'array') {
//     return '[]';
//   }
//   return node.type;
// }
