import Store from 'src/store'

export default class Report {
  constructor (param = {
    id: '',
    project: null,
    req: null,
    type: '',
    associatedCorrelation: null,
    report: null,
    argument: '',
    participant: null,
    changed: false,
    classifications: [],
    creationDate: ''
  }) {
    const store = new Store()
    const participant = { ...store.state.auth.basicUser }

    this.id = param.id || ''
    this.project = param.project || null
    this.req = param.req || null
    this.type = param.type || ''
    this.associatedCorrelation = param.associatedCorrelation || null
    this.report = param.report || null
    this.argument = param.argument || ''
    this.participant = param.participant || participant || null
    this.changed = param.changed || false
    this.classifications = param.classifications || []
    this.creationDate = param.creationDate || ''
  }
}
