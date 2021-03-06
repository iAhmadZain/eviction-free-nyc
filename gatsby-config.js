const languages = require('./src/data/languages');
const autoprefixer = require('autoprefixer');

const ENV_PATH = `.env.${process.env.NODE_ENV}`;

require("dotenv").config({
  path: ENV_PATH,
});

if (!process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_TOKEN) {
  console.log(
    `Please define CONTENTFUL_SPACE_ID and ` +
    `CONTENTFUL_TOKEN in ${ENV_PATH}.`
  );
  process.exit(1);
}

module.exports = {
  siteMetadata: {
    title: `Gatsby with Contentful`,
    languages
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'custom-sass-loader',
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 2 versions'],
          })
        ]
      }
    }
    // ,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-67069242-4",
    //     // Puts tracking script in the head instead of the body
    //     head: false
    //   }
    // },
    // `gatsby-plugin-offline`
  ]
};
