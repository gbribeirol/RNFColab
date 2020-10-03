export default class AssociationGoal {
  constructor (param = {
    goal: null,
    correlation: null,
    justification: ''
  }) {
    this.goal = param.goal
    this.correlation = param.correlation
    this.justification = param.justification
  }
}
