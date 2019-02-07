/**
 * @Author: Jack Woods <jackrwoods>
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: user.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-02-05T13:10:18-08:00
 * @Copyright: 2018 Oregon State University
 */

import UserApi from '@/utils/api/user.js'

export default {
  namespaced: true,
  state: {
    isLoggedIn: false, // Becomes true if the user logs in
    studentType: 'On Campus',
    onid: '', // The current user's onid username. ie: woodjack
    firstName: '', // The current user's first name. ie: Jack
    primaryAffiliation: '', // The current user's primary affiliation. This is either 'student' or 'employee'
    data: [], // An array containing all of the user's dataObjects, including the current one.
    administrator: false
  },
  getters: {
    onid: state => {
      return state.onid
    },
    firstName: state => {
      return state.firstName
    },
    primaryAffiliation: state => {
      return state.primaryAffiliation
    },
    data: state => {
      return state.data
    },
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    studentType: state => {
      return state.studentType
    },
    administrator: state => {
      return state.administrator
    }
  },
  mutations: {
    // Initializes/updates all of the user variables.
    update (state, userObject) {
      state.onid = userObject.onid
      state.firstName = userObject.firstName
      state.primaryAffiliation = userObject.primaryAffiliation
      state.isLoggedIn = true
      state.administrator = userObject.administrator ? userObject.administrator : false
    },
    histData (state, histData) {
      state.data = histData
    },
    // Removes one historical data entry
    removeHistData (state, index) {
      state.data.splice(index, 1)
    },
    setStudentType (state, data) {
      state.studentType = data.newType
    }
  },
  actions: {
    setUserVars (context) {
      // Download user data using the user api
      if (UserApi.isLoggedIn()) {
        UserApi.downloadUserData().then(userObject => {
          context.commit('update', userObject)
        })
        UserApi.downloadHistData(context.getters['user/onid']).then(histData => {
          context.commit('histData', histData)
        })
      }
    }
  }
}
