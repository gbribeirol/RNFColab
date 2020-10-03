import Store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Comment {
  constructor (param = { content: '' }) {
    const { state } = Store()

    this.content = param.content || ''
    this.owner = param.owner || { ...state.auth.basicUser }
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}
