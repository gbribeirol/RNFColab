import { uid } from 'quasar'
// import Vue from 'vue'
// const vue = new Vue()

export default class User {
  constructor (param = {
    id: '',
    password: '',
    name: '',
    email: '',

    cpf: '',
    birthDate: null,

    gender: '',
    photoURL: '',
    phoneNumber: '',
    idiom: '',

    roles: [],

    enable: true,
    creationDate: null
  }) {
    this.id = param.id || uid()
    this.password = param.password || ''
    this.name = param.name || ''
    this.email = param.email || ''
    this.cpf = param.cpf || ''
    this.birthDate = param.birthDate || null
    this.phoneNumber = param.phoneNumber || ''

    this.gender = param.gender || ''
    this.photoURL = param.photoURL || ''
    this.idiom = param.idiom || 'pt-br'

    this.roles = param.roles || []

    this.enable = param.enable || true
    // this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}
