// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex' // Imported to use Vuex as central data store
import axios from 'axios' // Imported to interact with sustainability API.
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Configure axios with sustainability api base url
axios.defaults.baseURL = 'https://api.sustainability.oregonstate.edu/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // Imported
  store, // Imported
  components: { App }, // App is imported
  template: '<App/>'
})

Vue.use(Vuex) // Use Vuex as central data store
