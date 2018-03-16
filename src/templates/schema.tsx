import { Container } from 'components/container';
import { JSONTree } from 'components/jsonTree';
import { oceanicNextTheme } from 'components/jsonTree/node';
import * as React from 'react';
import { AppSchema, JSONSchema } from 'types/AppSchema';

const Schema: React.SFC<any> = (props) => {
  const app: AppSchema = props.data.schemasJson;

  return (
    <>
      <Container>
        <h1>{app.title}</h1>
      </Container>
      <JSONTree schema={app} />
    </>
  );
};

export const pageQuery = graphql`
  query schemaQuery($id: String!) {
    schemasJson(id: { eq: $id }) {
      title
      type
      properties
    }
  }
`;

export default Schema;
