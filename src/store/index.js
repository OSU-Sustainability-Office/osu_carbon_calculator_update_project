/**
 * @Author: Jack Woods
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: index.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-02-11T18:01:03-08:00
 * @Copyright: 2018 Oregon State University
 */

import Vue from 'vue'
import Vuex from 'vuex'
import CalculatorModule from './modules/calculator.js'
import UserModule from './modules/user.js'
import UIModule from './modules/ui.js'
// import VuexPersist from 'vuex-persist'

// Allows the vuex store to persist in the same tab.
// const vuexPersist = new VuexPersist({
//   key: 'osu-carbon-calculator',
//   storage: localStorage
// })

Vue.use(Vuex) // Use Vuex as central data store

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: UserModule,
    calculator: CalculatorModule,
    ui: UIModule
  }
})
// Add for vuex-persist: ,
// plugins: [vuexPersist.plugin]
