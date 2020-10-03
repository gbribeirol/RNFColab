import store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Like {
  constructor (param = {
    owner: null,
    creationDate: null
  }) {
    this.owner = param.owner || { ...store().state.auth.basicUser }
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}
