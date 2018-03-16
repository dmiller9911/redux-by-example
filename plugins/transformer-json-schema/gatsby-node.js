const crypto = require('crypto');
const path = require('path');
const GraphQlJson = require('graphql-type-json');

exports.onCreateNode = async ({ node, boundActionCreators, loadNodeContent }) => {
  if (node.internal.mediaType !== 'application/json') {
    return;
  }

  const { createNode, createParentChildLink } = boundActionCreators;
  const content = await loadNodeContent(node);
  const parsedContent = JSON.parse(content);

  const contentDigest = crypto
    .createHash(`md5`)
    .update(content)
    .digest(`hex`);

  const jsonNode = {
    ...parsedContent,
    id: node.name,
    properties: JSON.stringify(parsedContent.properties),
    children: [],
    parent: node.id,
    internal: {
      contentDigest,
      type: 'SchemasJson',
    },
  };

  createNode(jsonNode);
  createParentChildLink({
    parent: node,
    child: jsonNode,
  });
};

exports.setFieldsOnGraphQLNodeType = (
  { type, store, pathPrefix, getNode, cache, reporter },
  pluginOptions,
) => {
  if (type.name !== 'SchemasJson') {
    return {};
  }
  return {
    properties: {
      type: GraphQlJson,
      resolve(node) {
        try {
          return JSON.parse(node.properties);
        } catch (_) {
          return {};
        }
      },
    },
  };
};
