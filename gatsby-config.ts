import { GatsbyConfig } from 'gatsby'

import { config } from './src/config/site'

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

const gatsbyConfig: GatsbyConfig = {
  pathPrefix: config.pathPrefix,
  trailingSlash: 'never',
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-schema-export',
      options: {
        dest: 'src/schema.graphql'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer'
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-lodash',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/favicon.png'
      }
    },
    'gatsby-plugin-offline'
  ]
}

export default gatsbyConfig
