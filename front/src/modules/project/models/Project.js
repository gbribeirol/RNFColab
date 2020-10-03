import { uid } from 'quasar'
import Store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Project {
  constructor (param = { id: uid() }) {
    const { state } = Store()

    this.id = param.id
    this.owner = param.owner || { ...state.auth.basicUser }
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()

    this.name = param.name || ''
    this.description = param.description || ''
    this.version = param.version || 0
    this.startDate = param.startDate || ''
    this.endDate = param.endDate || ''
    this.state = param.state || null
    this.reasonForCancellation = param.reasonForCancellation || ''
    this.initiated = param.initiated || false
    this.finished = param.finished || false
    this.endOfProjectNotice = param.endOfProjectNotice || false
    this.participants = param.participants || []
  }
}
