/**
 * @Author: Jack Woods <jackrwoods>
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: calculator.js
 * @Last modified by:   jackrwoods
 * @Last modified time: 2018-12-17T13:13:42-08:00
 * @Copyright: 2018 Oregon State University
 */

import ccApi from '@/utils/api/cc.js'

export default {
  namespaced: true,
  state: {
    categories: [], // Contains all of the categories, and their questions
    graphs: []
  },
  getters: {
    categories: state => {
      return state.categories
    },
    graphs: state => {
      return state.graphs
    }
  },
  mutations: {
    // Initializes/updates all of the user variables.
    updateCategoryTotal (state, categoryID, newTotal) {
      state.categories[categoryID].total = newTotal
    },
    // Updates the value input by the user
    updateQuestionValue (state, payload) {
      state.categories[payload.categoryID].questions[payload.questionIndex].value = payload.value
    },
    initializeCategories (state, categories) {
      // Initialize value endpoint for computed property reactivity
      categories.forEach(c => {
        c.questions.forEach(q => {
          q.value = 0
        })
      })
      state.categories = categories
    }
  },
  actions: {
    // Downloads all of the questions and categories
    downloadCategories (context) {
      ccApi.downloadCategories().then(categories => {
        context.commit('initializeCategories', categories.sort((a, b) => {
          return a.categoryID > b.categoryID ? 1 : -1
        }))
      })
    }
  }
}
