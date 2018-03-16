import glamorous, { Div, Img, Input } from 'glamorous';
import * as React from 'react';
import { minWidthSmall } from 'styles/breakpoints';
import { AppSchema } from 'types/AppSchema';
import { RootClick } from '../rootClick';
import { NavigationItem } from './navigationItem';
import { NavigationItemGroup } from './navigationItemGroup';
import { NavigationLogo } from './navigationLogo';
import { NavigationSearch } from './navigationSearch';

interface Props {
  apps: Pick<AppSchema, 'id' | 'title'>[];
  isOpen?: boolean;
  searchValue: string;
  onClose(): void;
  onSearchValueChange(value: string): void;
}

interface State {
  searchValue: string;
}

const Root = glamorous.div({
  position: 'fixed',
  width: 300,
  [minWidthSmall]: {
    position: 'static',
  },
});

const Nav = glamorous<Pick<Props, 'isOpen'>>('aside', {
  filterProps: ['isOpen'],
})({
  gridArea: 'nav',
  backgroundColor: '#333',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 'inherit',
  height: '100vh',
  willChange: 'transform',
  transition: 'transform 200ms ease-in-out',
  overflowY: 'auto',
}, ({ isOpen = false }) => ({
  transform: `translate(${isOpen ? 0 : '-100%'}, 0)`,
  [minWidthSmall]: {
    transform: 'translate(0, 0)',
  },
}));

const Navigation: React.SFC<Props> = ({ apps, isOpen, onClose, searchValue, onSearchValueChange }) => {
  const onNavItemClick = isOpen ? onClose : undefined;

  return (
    <RootClick isDisabled={!isOpen} onRootClick={onClose}>
      {({ ref }) => (
        <Root innerRef={ref}>
          <Nav isOpen={isOpen}>
            <NavigationLogo />
            <NavigationSearch
              searchValue={searchValue}
              onValueChange={onSearchValueChange}
            />
            <NavigationItemGroup>
              <NavigationItem
                to='/'
                text='Read Me'
                onClick={onNavItemClick}
              />
            </NavigationItemGroup>
            <NavigationItemGroup title='Apps'>
              {apps.map((app) => (
                <NavigationItem
                  key={app.id}
                  to={`/schema/${app.id}`}
                  onClick={onNavItemClick}
                  text={app.title}
                />
              ))}
            </NavigationItemGroup>
          </Nav>
        </Root>
      )}
    </RootClick>
  );
};

export { Navigation };
