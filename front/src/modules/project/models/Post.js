import { uid } from 'quasar'
import store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Post {
  constructor (param = {
    id: '',
    message: '',
    files: [],
    likes: [],
    comments: [],
    enable: true,
    owner: null,
    mission: null,
    creationDate: null
  }) {
    this.id = param.id || uid()
    this.message = param.message || ''
    this.files = param.files || []
    this.likes = param.likes || []
    this.comments = param.comments || []
    this.enable = param.enable || true
    this.owner = param.owner || { ...store().state.auth.basicUser }
    this.mission = param.mission || null
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}
