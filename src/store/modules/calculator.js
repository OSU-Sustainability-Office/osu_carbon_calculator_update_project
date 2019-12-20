/**
 * @Author: Jack Woods <jackrwoods>
 * @Date:   2018-11-27T13:45:59-08:00
 * @Filename: calculator.js
 * @Last modified by:   jackrwoods
 * @Last modified time: 2018-12-17T13:13:42-08:00
 * @Copyright: 2018 Oregon State University
 */

import ccApi from '@/utils/api/cc.js'

// Import classes for data
import Category from '../classes/category.js'
import Question from '../classes/questions/question.js'
import Input from '../classes/questions/input.js'
import Unit from '../classes/questions/unit.js'
import Trigger from '../classes/questions/trigger.js'

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
      let formattedCategories = [] // The array of categories that will be committed to the VueX store

      // Download and format each category
      ccApi.downloadCategories().then(categories => {
        // Sort in ascending order by categoryID
        categories.forEach(category => {
          let questions = [] // An array of question objects for this category

          // Build a question object for each question
          category.questions.forEach(question => {
            questions.push(new Question(
              new Input(
                question.input.type,
                new Unit(question.input.units.prefix, question.input.units.unit),
                question.input.values ? question.input.values : question.input.value
              ),
              question.metaData,
              question.text,
              new Trigger(
                question.trigger.parentQuestion,
                question.trigger.triggerValue
              ),
              question.initiallyVisible
            ))
          })

          // Create the category
          formattedCategories.push(new Category(category.id, category.color, category.title, questions))
        })

        context.commit('initializeCategories', formattedCategories.sort((a, b) => {
          return a.id > b.id ? 1 : -1
        }))
      })
    }
  }
}
