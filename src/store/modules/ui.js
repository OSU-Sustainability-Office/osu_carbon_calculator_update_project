/**
 * @Author: Jack Woods
 * @Date:   2019-01-07T15:21:19-08:00
 * @Filename: ui.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-02-11T15:55:47-08:00
 * @Copyright: 2018 Oregon State University
 */

export default {
  namespaced: true,
  state: {
    historicalDataDialog: false,
    oldDataDialog: false
  },
  getters: {
    historicalDataDialog: ( state ) => {
      return state.historicalDataDialog
    },
    oldDataDialog: ( state ) => {
      return state.oldDataDialog
    }
  },
  mutations: {
    // Initializes/updates all of the user variables.
    toggleHistoricalDataDialog ( state ) {
      state.historicalDataDialog = !state.historicalDataDialog
    },
    // Initializes/updates all of the user variables.
    toggleOldDataDialog ( state ) {
      state.oldDataDialog = !state.oldDataDialog
    }
  }
}
