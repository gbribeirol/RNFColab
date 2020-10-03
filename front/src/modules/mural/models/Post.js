import { uid } from 'quasar'
import Store from 'src/store'
import Vue from 'vue'
const vue = new Vue()

export default class Post {
  constructor (param = { id: uid() }) {
    const { state } = Store()
    const { id, name } = state.project.selected

    this.id = param.id || uid()

    this.message = param.message || ''
    this.messageType = param.messageType || ''
    this.construction = param.construction || { label: name, value: id }
    this.files = param.files || []
    this.likes = param.likes || []
    this.comments = param.comments || []
    this.enable = param.enable || true
    this.owner = param.owner || { ...state.auth.basicUser }
    this.creationDate = param.creationDate || vue.$firebase.firestore.Timestamp.now()
  }
}

// export default class User {
//   id = ''
//   backgroundPhoto = ''
//   email = ''
//   fullName = ''
//   mobile = ''
//   profilePhoto = ''

//   constructor (args) {
//     Object.keys(args).forEach((v, i) => {
//       this[v] = args[v]
//     })

//     return {
//       ...this
//     }
//   }
// }
