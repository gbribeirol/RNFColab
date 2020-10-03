import BasicUser from 'src/modules/user/models/BasicUser'

export function SET_USER (state, param) {
  state.user = param

  if (state.user !== null) {
    state.basicUser = new BasicUser(state.user)
  } else {
    state.basicUser = null
  }
}

export function SET_NAME (state, param) {
  state.userCredential.name = param
}
export function SET_EMAIL (state, param) {
  state.userCredential.email = param
}
export function SET_PASSWORD (state, param) {
  state.userCredential.password = param
}
export function SET_GENDER (state, param) {
  state.userCredential.gender = param
}

export function SET_AUTH_IN_PROGRESS (state, param) {
  state.authInProgress = param
}

export function SET_AVATAR_URL (state, param) {
  state.user.photoURL = param
  state.basicUser.photoURL = param
}

// // import { get, add, set, remove } from 'src/env/localforage'
// import { add } from 'src/env/localforage'
// import { map } from 'lodash'
// import Vue from 'vue'

// const vue = new Vue()

// export function LOAD (state) {
//   // state.expenses.l = get()

//   vue.$firestore.ref('expenses').on('value', data => {
//     const list = data.val()
//     state.expenses.l = map(list, (expense, index) => {
//       expense.id = index
//       return expense
//     })
//   })
// }

// export function ADD (state, param) {
//   add(param)
//   state.expenses.l.unshift(param)
// }

// export function REMOVE (state, param) {
//   // remove(param)
//   // state.expenses.l.splice(state.expenses.l.indexOf(param), 1)

//   vue.$firestore.ref(`expenses/${param.id}`).remove()
// }
