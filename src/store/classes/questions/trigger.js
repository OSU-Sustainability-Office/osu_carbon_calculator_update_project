export default class Trigger {
  constructor (parentQuestion, triggerValue) {
    this.parentQuestion = parentQuestion // Number - references the id of the parentQuestion in the array of questions
    this.triggerValue = triggerValue // String
  }
}
