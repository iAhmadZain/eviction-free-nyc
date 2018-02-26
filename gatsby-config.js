const languages = require('./src/data/languages');
const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: `Gatsby with Contentful`,
    languages
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: true
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `p7o2rk07b5kj`,
        accessToken: `85707e698ac8df8816c56effecbbcf050ffc2a1f8646e0675b1e7def94f257c1`,
      },
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
  ],
}