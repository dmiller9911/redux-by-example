import Link, { GatsbyLinkProps } from 'gatsby-link';
import glamorous from 'glamorous';
import * as React from 'react';

interface Props {
  text: string;
  to: string;
  onClick?(e: React.MouseEvent<any>): void;
}

const Root = glamorous.li({
  margin: 0,
  padding: 0,
});

export const StyledLink = glamorous<GatsbyLinkProps>(Link as any)({
  margin: '0 30px',
  padding: '10px 0',
  height: 45,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontSize: 16,
  color: '#fff',
  opacity: 0.7,
  position: 'relative',
  borderBottom: '1px solid rgba(255,255,255,.05)',
  ':hover': {
    opacity: 1,
  },
  '.active': {
    fontWeight: 700,
    opacity: 1,
  },
  '&:last-child': {
    border: 'none',
  },
});

const NavigationItem: React.SFC<Props> = ({ text, to, onClick }) => (
  <Root>
    <StyledLink exact to={to}>
      {text}
    </StyledLink>
  </Root>
);

export { NavigationItem };
