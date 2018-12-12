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
          q.value = 'default'
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
