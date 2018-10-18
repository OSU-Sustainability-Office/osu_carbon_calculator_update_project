// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // Imported
  store, // Imported
  components: { App }, // App is imported
  template: '<App/>'
})

Vue.use(Vuex) // Use Vuex as central data store
