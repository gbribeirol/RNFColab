import store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Comment {
  constructor (param = {
    content: '',
    owner: null,
    creationDate: null
  }) {
    this.content = param.content || ''
    this.owner = param.owner || { ...store().state.auth.basicUser }
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}
