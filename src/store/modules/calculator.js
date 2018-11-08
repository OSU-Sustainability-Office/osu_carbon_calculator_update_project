import ccApi from '@/utils/api/cc.js'

export default {
  namespaced: true,
  state: {
    categories: [] // Contains all of the categories, and their questions
  },
  getters: {
    categories: state => {
      return state.categories
    }
  },
  mutations: {
    // Initializes/updates all of the user variables.
    updateCategoryTotal (state, categoryID, newTotal) {
      state.categories[categoryID].total = newTotal
    },
    initializeCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    // Downloads all of the questions and categories
    downloadCategories (context) {
      ccApi.downloadCategories().then(categories => {
        context.commit('initializeCategories', categories)
      })
    }
  }
}
