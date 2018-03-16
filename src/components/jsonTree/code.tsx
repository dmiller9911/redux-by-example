import glamorous, { Span, withTheme } from 'glamorous';
import * as React from 'react';
import { ThemedProps } from 'styles/theme';

const typedWithTheme: <P>(comp: React.SFC<ThemedProps<P>>) => React.SFC<P> = withTheme as any;

export const ConstantValue = glamorous.span<ThemedProps>(({ theme }) => ({
  color: theme.code.null,
}));

export const BooleanValue = glamorous.span<ThemedProps>(({ theme }) => ({
  color: theme.code.boolean,
}));

export const NumberValue = glamorous.span<ThemedProps>(({ theme }) => ({
  color: theme.code.number,
}));

export const StringValue = typedWithTheme<{ children?: any}>(({ children, theme }) => (
  <>
    <Span color={theme.code.string}>{children}</Span>
  </>
));

const JSONKeyWrapper = glamorous.span<ThemedProps<{ children?: React.ReactNode; }>>(({ theme }) => ({
  color: theme.code.key,
  marginRight: 3,
}));

export const JSONKey: React.SFC = ({ children }) => (
  <JSONKeyWrapper>{children}:</JSONKeyWrapper>
);

export const Ellipsis = () => <Span letterSpacing={-2}>...</Span>;
