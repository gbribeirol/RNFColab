import Vue from 'vue'
const vue = new Vue()

export function SET_LOADING (state, param) {
  state.loading = param
}

export function SET_LIST (state, param) {
  state.users = param
}

export function ADD_LIST (state, item) {
  state.users.push(item)
}

export function UPDATE_LIST_ITEM (state) {
  const index = state.users.findIndex(el => el.id === state.copy.id)
  vue.$set(state.users, index, state.copy)
}

export function ERASE_ITEM_FROM_LIST (state) {
  const index = state.users.findIndex(el => el.id === state.selected.id)
  state.users.splice(index, 1)
}

export const SET_SELECTED = (state, item) => {
  state.selected = item
  state.copy = JSON.parse(JSON.stringify(item))
}

export const SET_COPY = (state, param) => {
  state.copy = JSON.parse(JSON.stringify(param))
}

export function SET_STATE (state, param) {
  state.state = param
}

export function SET_NAME (state, param) {
  state.copy.name = param
}
export function SET_TOTAL_EARNED_POINTS (state, param) {
  state.copy.totalEarnedPoints += param
}

export function SET_ENABLE (state, param) {
  state.copy.enable = param
}
export function SET_CREATION_DATE (state, param) {
  state.copy.creationDate = param
}

// import { get, add, set, remove } from 'src/env/localforage'
// import { add } from 'src/env/localforage'
// import Vue from 'vue'

// const vue = new Vue()

// export function SET_USER_LIST (state, param) {
//   state.user.users = param
// }

// export function SET_USER_LIST (state, param) {
//   // Vue.set(state.user.users, param)
//   // state.app = { ...state.app, featureName: param }
// }

// export default {
//   'SET_USER_LIST' (state, param) { state.user.users = param }
// }

// export function SET (state, param) {
//   // set(param)
//   // state.expenses.l[state.expenses.l.indexOf(param)] = param

//   vue.$firestore.ref(`expenses/${param.id}`).update(param)
// }

// export function REMOVE (state, param) {
//   // remove(param)
//   // state.expenses.l.splice(state.expenses.l.indexOf(param), 1)

//   vue.$firestore.ref(`expenses/${param.id}`).remove()
// }
