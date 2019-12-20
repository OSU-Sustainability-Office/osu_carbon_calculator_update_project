// import Input from './input.js'
// import Trigger from './trigger.js'

export default class Question {
  constructor (input, metaData, text, trigger, initiallyVisible) {
    this.input = input // Instance of the Input class
    this.metaData = metaData // String
    this.text = text // String containing the question text. ie: "how many miles do you drive?"
    this.trigger = trigger // Instance of the Trigger class
    this.visible = initiallyVisible // Boolean value that toggles the object's visibility.
  }
}
