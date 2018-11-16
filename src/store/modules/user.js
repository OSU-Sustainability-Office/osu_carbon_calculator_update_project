import UserApi from '@/utils/api/user.js'

export default {
  namespaced: true,
  state: {
    isLoggedIn: false, // Becomes true if the user logs in
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
      state.data = userObject.data
      state.isLoggedIn = true
      state.administrator = userObject.administrator
    }
  },
  actions: {
    setUserVars (context) {
      if (UserApi.isLoggedIn()) {
        UserApi.downloadUserData().then(userObject => {
          context.commit('update', userObject)
        })
      }
    }
  }
}
