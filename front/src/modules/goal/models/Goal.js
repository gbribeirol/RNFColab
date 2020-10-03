// import { uid } from 'quasar'

export default class Goal {
  constructor (param = {
    id: '',
    name: '',
    // description: '',
    // upGoal: '',

    ascCorrelations: [],
    desCorrelations: []
  }) {
    this.id = param.id || '' // uid()
    this.name = param.name || ''
    // this.description = param.description || ''
    // this.upGoal = param.upGoal || ''
    this.ascCorrelations = param.ascCorrelations || []
    this.desCorrelations = param.desCorrelations || []
  }
}
