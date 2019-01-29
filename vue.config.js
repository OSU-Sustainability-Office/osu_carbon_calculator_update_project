/**
 * @Author: Jack Woods
 * @Date:   2018-11-27T13:45:59-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: vue.config.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-29T13:32:02-08:00
 * @Copyright: 2019 Oregon State University
 */

const babelEnvDeps = require('webpack-babel-env-deps')

// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    // Transpile dependencies
    // config.module
    //   .rule('transpileDependencies')
    //   .test(/\.js$/)
    //   .exclude(babelEnvDeps.exclude())
    //   .use('babel-loader')
    //   .loader('babel-loader')
    //   .end()
    config.merge({
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [
              babelEnvDeps.exclude() // returns /node_modules(?!(/|\\)(detect-indent|request|...)(/|\\))/
            ],
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    })

    // Load and render SVG images
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
