import { uid } from 'quasar'
import Store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Classification {
  constructor (param = { id: uid() }) {
    const { state } = Store()

    this.id = param.id || uid()

    this.classification = param.classification || null
    this.justificationOfClassification = param.justificationOfClassification || ''
    this.returnOfJustification = param.returnOfJustification || ''

    this.participant = param.participant || { ...state.auth.basicUser }
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}
