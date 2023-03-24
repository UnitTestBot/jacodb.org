const path = require('path');
const remarkSlug = require('remark-slug');

module.exports = {
  siteMetadata: {
    title: 'JacoDB',
    titleTemplate: '%s · Documentation',
    author: 'UnitTestBot contributors',
    // description: 'The most popular front-end framework, rebuilt for React.',
    url: 'https://jacodb.org',
    browsers: [
      'last 4 Chrome versions',
      'last 4 Firefox versions',
      'last 2 Edge versions',
      'last 2 Safari versions',
    ],
  },
  plugins: [
    'gatsby-plugin-sorted-assets',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/layouts/ApiLayout'),
        },
        remarkPlugins: [remarkSlug],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, './src'),
        name: 'source',
      },
    },
    {
      resolve: 'gatsby-transformer-react-docgen'
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs'],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-astroturf',
      options: { extension: '.module.scss' },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
