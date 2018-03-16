import glamorous, { ThemeProvider } from 'glamorous';
import * as React from 'react';
import { ThemedProps } from 'styles/theme';
import { JSONSchema } from 'types/AppSchema';
import { Container } from '../container';
import { Node } from './node';

interface Props {
  schema: JSONSchema;
}

const Root = glamorous.pre<ThemedProps>(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.code.background,
  fontSize: '0.875rem',
  color: theme.code.foreground,
  margin: 0,
  padding: '20px 0',
}));

export const JSONTree: React.SFC<Props> = ({ schema }) => {
  return (
    <Root>
      <Container>
        {Object.entries(schema.properties).map(([key, value]) => (
          <div key={key}>
            <Node node={value} name={key} />
          </div>
        ))}
      </Container>
    </Root>
  );
};
