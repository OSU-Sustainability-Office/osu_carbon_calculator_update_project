// import Question from './questions/question.js'

export default class Category {
  // Create a category
  constructor (id, color, title, questions) {
    this.id = id // Number
    this.color = color // String
    this.title = title // String
    this.questions = questions// Array of instances of the Question class
  }
}
