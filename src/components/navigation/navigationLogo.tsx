import glamorous, { Div, Img } from 'glamorous';
import * as React from 'react';
import * as logoSrc from '../../assets/logo-title-light.png';

const Root = glamorous.div({
  paddingTop: 10,
  paddingBottom: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Logo = glamorous.img({
  width: 200,
  margin: 0,
});

export const NavigationLogo = () => (
  <Root>
    <Logo src={logoSrc} alt='Redux by Example Logo' />
  </Root>
);
