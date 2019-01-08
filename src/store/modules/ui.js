/**
 * @Author: Jack Woods
 * @Date:   2019-01-07T15:21:19-08:00
 * @Filename: ui.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-07T15:29:17-08:00
 * @Copyright: 2018 Oregon State University
 */

export default {
  namespaced: true,
  state: {
    historicalDataDialog: false
  },
  getters: {
    historicalDataDialog: state => {
      return state.historicalDataDialog
    }
  },
  mutations: {
    // Initializes/updates all of the user variables.
    toggleHistoricalDataDialog (state) {
      state.historicalDataDialog = !state.historicalDataDialog
    }
  }
}
