import Vue from 'vue'
import Vuex from 'vuex'
import CalculatorModule from './modules/calculator.js'
import UserModule from './modules/user.js'

Vue.use(Vuex) // Use Vuex as central data store

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user: UserModule,
    calculator: CalculatorModule
  }
})
