export default class BasicUser {
  constructor (param = {
    id: '',
    name: '',
    email: '',
    photoURL: ''
  }) {
    this.id = param.id || ''
    this.name = param.name || ''
    this.email = param.email || ''
    this.photoURL = param.photoURL || ''
  }
}
