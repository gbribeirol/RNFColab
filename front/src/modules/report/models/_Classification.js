import Store from 'src/store'

export default class Classification {
  constructor (param = {
    id: '',
    classification: null,
    justificationOfClassification: '',

    participant: null,
    creationDate: ''
  }) {
    const store = new Store()
    const participant = { ...store.state.auth.basicUser }

    this.id = param.id || ''
    this.classification = param.classification || null
    this.justificationOfClassification = param.justificationOfClassification || ''

    this.participant = param.participant || participant || null
    this.creationDate = param.creationDate || ''
  }
}
