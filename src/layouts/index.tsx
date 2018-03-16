import { Container } from 'components/container';
import { Header } from 'components/header';
import { Navigation } from 'components/navigation';
import { NavigationRendererProps } from 'components/page';
import { Page } from 'components/page';
import { Div, ThemeProvider } from 'glamorous';
import glamorous from 'glamorous';
import * as React from 'react';
import Helmet from 'react-helmet';
import { minWidthSmall } from 'styles/breakpoints';
import 'styles/global.css';
import { typography } from 'styles/typography';
import { AppSchema } from 'types/AppSchema';
import { AllQueryResult, GatsbyLayoutComponentProps } from 'types/Gatsby';
import { theme } from '../styles/theme';

type AppData = Pick<AppSchema, 'id' | 'title'>;

type Props = GatsbyLayoutComponentProps<
  { title?: string },
  {
    allSchemasJson: AllQueryResult<AppData>;
  }
>;

interface State {
  searchValue: string;
  filteredApps: AppData[];
}

export const query = graphql`
  query layoutQuery {
    allSchemasJson {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

export default class TemplateWrapper extends React.Component<Props, State> {
  public state: State = {
    searchValue: '',
    filteredApps: this.getFilteredApps('', this.props),
  };

  private getFilteredApps(filter: string, props: Props) {
    const formattedFilter = filter.toLowerCase().replace(/\s/gi, '');
    return this.props.data.allSchemasJson.edges.reduce<AppData[]>((acc, { node }) => {
      if (!formattedFilter || node.title.toLowerCase().includes(formattedFilter)) {
        return [...acc, node];
      }
      return acc;
    }, []);
  }

  private handleSearchValueChange = (value: string) => {
    this.setState((_, props) => ({
      filteredApps: this.getFilteredApps(value, props),
      searchValue: value,
    }));
  }

  private navigationRenderer = ({ isOpen, onClose }: NavigationRendererProps) => {
    const { filteredApps, searchValue } = this.state;

    return (
      <Navigation
        isOpen={isOpen}
        onClose={onClose}
        apps={filteredApps}
        searchValue={searchValue}
        onSearchValueChange={this.handleSearchValueChange}
      />
    );
  }

  public render() {
    const { children, layoutContext } = this.props;
    const title = layoutContext.title || 'Read Me';

    return (
      <>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'react, redux, gatsby' },
          ]}
        />
        <ThemeProvider theme={theme}>
          <Page title={title} renderNavigation={this.navigationRenderer}>
            {children()}
          </Page>
        </ThemeProvider>
      </>
    );
  }
}
