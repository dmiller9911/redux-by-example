import glamorous, { Div } from 'glamorous';
import * as React from 'react';
import { minWidthSmall } from 'styles/breakpoints';
import { Container } from '../container';
import { Header } from '../header';
import { Navigation } from '../navigation';

export interface NavigationRendererProps {
  isOpen?: boolean;
  onClose(): void;
}

interface Props {
  title: string;
  children?: React.ReactNode;
  renderNavigation(props: NavigationRendererProps): React.ReactNode;
}

interface State {
  showHeader: boolean;
  leftNavOpen: boolean;
}

const Root = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '100%',
});

const NavAndContent = glamorous.div({
  display: 'flex',
  flex: '1 1 auto',
});

const NavWrapper = glamorous.div({
  position: 'relative',
  zIndex: 2,
});

const Content = glamorous.main({
  flex: '1 1 auto',
  position: 'relative',
  paddingTop: 40,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
});

class Page extends React.Component<Props, State> {
  public state: State = {
    showHeader: false,
    leftNavOpen: false,
  };

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = (e: UIEvent) => {
    if (window.scrollY > 100 && !this.state.showHeader) {
      this.setState(() => ({ showHeader: true }));
    } else if (window.scrollY < 100 && this.state.showHeader) {
      this.setState(() => ({ showHeader: false }));
    }
  }

  private handleNavClose = () => {
    this.setState({ leftNavOpen: false });
  }

  public render() {
    const { children, renderNavigation, title } = this.props;
    const { leftNavOpen, showHeader } = this.state;

    return (
      <Root>
        <Header title={title} isVisible={showHeader} />
        <NavAndContent>
          {!!renderNavigation && (
            <NavWrapper>
              {renderNavigation({
                isOpen: this.state.leftNavOpen,
                onClose: this.handleNavClose,
              })}
            </NavWrapper>
          )}
          <Content>{children}</Content>
        </NavAndContent>
      </Root>
    );

  }
}

export { Page };
