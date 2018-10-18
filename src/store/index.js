import Vuex from 'vuex'
import CalculatorModule from './modules/calculator.js'
import UserModule from './modules/user.js'

export default new Vuex.Store({
  state: {
    isLoggedIn: false // This becomes true if the user decides to login with ONID
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
