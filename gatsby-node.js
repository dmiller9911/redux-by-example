const path = require('path');

const schemaTemplateComponent = path.resolve(`./src/templates/schema.tsx`);
const schemaLayoutComponent =  path.resolve(`./src/layouts/index.tsx`);

exports.createPages = async ({ graphql, boundActionCreators: { createPage, createLayout } }) => {
  const { data } = await graphql(`{
    allSchemasJson {
      edges {
        node {
          id
          title
        }
      }
    }
  }`);
  const { allSchemasJson } = data;
  allSchemasJson.edges.forEach(({ node }) => {
    const layoutId = `${node.id}-layout`;
    const context = {
      id: node.id,
      title: node.title,
    };

    createLayout({
      context,
      component: schemaLayoutComponent,
      id: layoutId,
    });

    createPage({
      context,
      path: `/schema/${node.id}/`,
      component: schemaTemplateComponent,
      layout: layoutId,
    });
  });
};

exports.modifyWebpackConfig = ({config}) => {
  const srcDir = path.resolve('./src');
  config.merge({
    resolve: {
      modulesDirectories: [srcDir],
    },
  });
};
