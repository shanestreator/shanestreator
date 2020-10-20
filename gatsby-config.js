const contentful = require('contentful');
const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID, ANALYTICS_ID, DETERMINISTIC, NODE_ENV } = process.env;

const IS_PROD = NODE_ENV === 'production'

const siteUrl = IS_PROD ? 'https://www.shanestreator.com' : 'http://localhost:8000'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const getAboutEntry = entry => entry.sys.contentType.sys.id === 'about';

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Cabin', 'Open Sans'],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    },
  },
  'gatsby-transformer-remark',
  'gatsby-plugin-offline',
];

module.exports = client.getEntries().then(entries => {
  if (entries.items.find(getAboutEntry)) {
    const { mediumUser } = entries.items.find(getAboutEntry).fields;

    plugins.push({
      resolve: 'gatsby-source-medium-fix',
      options: {
        username: mediumUser || '@medium',
      },
    });
  }

  if (ANALYTICS_ID) {
    plugins.push({
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ANALYTICS_ID,
      },
    });
  }

  return {
    // !!mediumUser
    siteMetadata: {
      isMediumUserDefined: null,
      deterministicBehaviour: !!DETERMINISTIC,
      siteUrl,
      title: 'Shane Streator',
      image: '/images/SS-logo.svg',
      siteLanguage: 'en',
      ogLanguage: 'en_US',
      favicon: '/favicon.ico',
    },
    plugins,
  };
});
