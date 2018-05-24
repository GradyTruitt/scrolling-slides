const path = require('path')
const fs = require('fs-extra')

const StringReplacePlugin = require("string-replace-webpack-plugin")
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}/index.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.modifyWebpackConfig = function({config, stage}) {
  // allows for absolute imports with src directory as root
  config.merge({
    resolve: {
      root: path.resolve(__dirname, './src'),
      extensions: ['', '.js', '.jsx', '.json']
    }
  });

  switch (stage) {
    // adds eslint hot-reloading
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      })
      break;

    case 'build-html':
      // Removes "data-react-helmet" from all tags inside HTML heads that are
      // put in by react-helmet
      config.loader('string-replace-loader', {
        test: /\.(js|jsx)$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /data-react-helmet/g ,
              replacement: function(match, p1, offset, string) {
                return '';
              }
            }
          ]
        })
      })
      config.plugin('string-replace-plugin', StringReplacePlugin)
  }
  return config;
}

exports.onPostBootstrap = () => {
  fs.copy('src/images', 'public/images')
    .catch(() => console.log('error copying files'))
}
