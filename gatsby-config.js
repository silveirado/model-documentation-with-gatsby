module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-lodash',
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `galgo`,
        collection: `namespaces`,
      },
    },
  ],
}
