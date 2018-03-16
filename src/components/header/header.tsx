import { H4 } from 'components/text';
import Link from 'gatsby-link';
import glamorous from 'glamorous';
import * as React from 'react';
import { minWidthSmall } from '../../styles/breakpoints';
import { Container } from '../container';

interface Props {
  title: string;
  isVisible: boolean;
}

const HeaderRoot = glamorous.header<Pick<Props, 'isVisible'>>({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: '15px 0',
  backgroundColor: '#fff',
  zIndex: 10,
  boxShadow: '0 5px 25px rgba(0,0,0,.1)',
  transition: 'transform 200ms ease-in-out',
  [minWidthSmall]: {
    left: 300,
  },
}, ({ isVisible }) => ({
  transform: isVisible ? 'translate(0,0)' : 'translate(0, -100%)',
}));

const HeaderTitle = glamorous(H4)({ margin: 0 });

export const Header: React.SFC<Props> = ({ isVisible, title, ...rest }) => {
  return (
    <HeaderRoot isVisible={isVisible}>
      <Container>
        <HeaderTitle>{title}</HeaderTitle>
      </Container>
    </HeaderRoot>
  );
};
