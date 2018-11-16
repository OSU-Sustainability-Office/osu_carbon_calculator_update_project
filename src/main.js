// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios' // Imported to interact with sustainability API.
import App from '@/App'
import router from '@/router'
import store from '@/store'
import elm from 'element-ui'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

// For element UI
Vue.use(Vuei18n)
Vue.use(elm, { locale: locale })

Vue.config.productionTip = false

// Configure axios with sustainability api base url
axios.defaults.baseURL = 'https://api.sustainability.oregonstate.edu'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
