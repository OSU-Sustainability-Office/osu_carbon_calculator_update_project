/**
 * @Author: Jack Woods
 * @Date:   2018-11-27T13:45:59-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: vue.config.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-29T15:11:41-08:00
 * @Copyright: 2019 Oregon State University
 */

// const { dependencies } = require('./package.json') can use this to transpile all dependencies

// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    // Load and render SVG images
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
