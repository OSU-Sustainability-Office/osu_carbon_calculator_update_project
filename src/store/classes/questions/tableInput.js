import Input from './input.js'

export default class TableInput extends Input {
  constructor (type, unit, values) {
    super(type, unit) // Initializes type and unit

    // This class can be constructed with a single value or many values
    this.values = Array.isArray(values) ? values : null // If there are many values, save in Input.values
    this.value = !Array.isArray(values) ? values : null // If there is just one value, save in Input.value
  }

  get getValues () {
    return this.values ? this.values : this.value // Return whichever one isn't null
  }
}
