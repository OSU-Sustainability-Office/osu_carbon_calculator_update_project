/**
 * @Author: Jack Woods
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: index.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-07T15:26:55-08:00
 * @Copyright: 2018 Oregon State University
 */

import Vue from 'vue'
import Vuex from 'vuex'
import CalculatorModule from './modules/calculator.js'
import UserModule from './modules/user.js'
import UIModule from './modules/ui.js'

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
    calculator: CalculatorModule,
    ui: UIModule
  }
})
