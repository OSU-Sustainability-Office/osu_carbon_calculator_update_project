/**
 * @Author: Jack Woods
 * @Date:   2018-11-27T13:45:59-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: vue.config.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-29T14:09:51-08:00
 * @Copyright: 2019 Oregon State University
 */

const babelEnvDeps = require('webpack-babel-env-deps')

// vue.config.js
module.exports = {
  transpileDependencies: [
    'axios',
    'chart.js',
    'element-ui',
    'file-loader',
    'query-string',
    'vue',
    'vue-chartjs',
    'vue-directive-long-press',
    'vue-i18n',
    'vue-parallaxy',
    'vue-router',
    'vue-svg-loader',
    'vuex',
    'webpack-babel-env-deps'
  ],
  chainWebpack: (config) => {
    config.merge({
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [
              babelEnvDeps.exclude() // returns /node_modules(?!(/|\\)(detect-indent|request|...)(/|\\))/
            ],
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    targets: {
                      browsers: ['> 1%, last 2 versions, Firefox ESR'],
                      uglify: true
                    }
                  }]
                ]
              }
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
