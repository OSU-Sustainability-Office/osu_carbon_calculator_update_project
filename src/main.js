/**
 * @Author: Jack Woods
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: main.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-29T21:31:30-08:00
 * @Copyright: 2018 Oregon State University
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios' // Imported to interact with sustainability API.
import App from '@/App'
import router from '@/router/index.js'
import store from '@/store/index.js'
import elm from 'element-ui'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
import '@/assets/element-variables.scss'

// For element UI
Vue.use(Vuei18n)
Vue.use(elm, { locale: locale })

Vue.config.productionTip = false
Vue.config.debug = false
Vue.config.devtools = false
// Configure axios with sustainability api base url
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API

Vue.config.debug = false
Vue.config.devtools = false

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: (h) => h(App)
})
