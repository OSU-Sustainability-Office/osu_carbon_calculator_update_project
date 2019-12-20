export default class Unit {
  constructor (prefix, unit) {
    this.prefix = prefix // Boolean. If true, this unit is a prefix (like $). If false, this is a suffix (like MPG)
    this.unit = unit // String containing the characters used to express this unit.
  }
}
