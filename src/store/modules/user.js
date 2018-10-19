import UserApi from '@/utils/api/user.js'

export default {
  namespaced: true,
  state: {
    onid: '', // The current user's onid username. ie: woodjack
    firstName: '', // The current user's first name. ie: Jack
    primaryAffiliation: '', // The current user's primary affiliation. This is either 'student' or 'employee'
    data: [] // An array containing all of the user's dataObjects, including the current one.
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
    }
  },
  mutations: {
    // Initializes/updates all of the user variables.
    update (state, userObject) {
      state.onid = userObject.onid
      state.firstName = userObject.firstName
      state.primaryAffiliation = userObject.primaryAffiliation
      state.data = userObject.data
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
