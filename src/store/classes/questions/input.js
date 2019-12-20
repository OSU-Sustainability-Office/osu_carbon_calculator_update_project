// import Unit from './unit.js'
export default class Input {
  constructor (type, unit) {
    this.type = type // String denoting what kind of input this is. ie: list, value, etc
    this.unit = unit // Instance of the Unit class
  }
}
