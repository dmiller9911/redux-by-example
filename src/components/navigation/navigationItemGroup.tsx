import glamorous from 'glamorous';
import * as React from 'react';

export interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Root = glamorous.nav({
  marginTop: 10,
});

const Title = glamorous.div({
  fontSize: 11,
  color: 'rgba(255, 255, 255, 0.5)',
  margin: '0 30px 8px',
});

const Ul = glamorous.ul({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const NavigationItemGroup: React.SFC<Props> = ({ children, title }) => (
  <Root>
    {!!title && <Title>{title}</Title>}
    <Ul>
      {children}
    </Ul>
  </Root>
);

export { NavigationItemGroup };
