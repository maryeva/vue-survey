const path = require('path')
const projectRoot = path.resolve(__dirname)
const webpack = require('webpack')
const proxyOptions = require('./proxy.js')

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': `${projectRoot}/src`,
        'assets': `${projectRoot}/src/assets`
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify(process.env.API_URL),
          'WEB_URL': JSON.stringify(process.env.WEB_URL),
          'APP_URL': JSON.stringify(process.env.APP_URL),
          'SEGMENT_ID': JSON.stringify(process.env.SEGMENT_ID),
          'SENTRY_URL': JSON.stringify(process.env.SENTRY_URL),
          'STRIPE_SECRET_KEY': JSON.stringify(process.env.STRIPE_SECRET_KEY),
          'STRIPE_PUBLISHABLE_KEY': JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
          'POSTCODE_SEARCH_HOST': JSON.stringify(process.env.POSTCODE_SEARCH_HOST),
          'POSTCODE_SEARCH_KEY': JSON.stringify(process.env.POSTCODE_SEARCH_KEY),
          'INTERCOM_APP_ID': JSON.stringify(process.env.INTERCOM_APP_ID),
          'INTERCOM_SECRET_KEY': JSON.stringify(process.env.INTERCOM_SECRET_KEY),
          'SEGMENT_WRITE_KEY': JSON.stringify(process.env.SEGMENT_WRITE_KEY),
          'NPM_TOKEN': JSON.stringify(process.env.NPM_TOKEN)
        }
      })
    ],
    devServer: {
      proxy: proxyOptions
    }
  },
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     openAnalyzer: false
  //   }
  // }
}
