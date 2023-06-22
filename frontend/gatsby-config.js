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
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/assets/favicon-32x32.png`,
      },
    },
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "G-43F2VNGSJH",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "jacodb.org",
        // defaults to false
        enableWebVitalsTracking: true,
      }
    }
  ],
};
