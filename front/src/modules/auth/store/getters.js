// import { getExpenses } from 'src/env/localforage'

// export function expenses_ () {
//   return getExpenses()
// }
// import Vue from 'vue'
// const vue = new Vue()

// vue.$auth.onAuthStateChanged(user => {
//   if (!user) {
//     return false
//   } else {
//     return true
//   }
// })
// let result
// if (vue.$auth.currentUser) {
//   result = vue.$auth.currentUser.uid
// } else {
//   result = null
// }
// return result

export const isLogged = ({ user }) => {
  // return !!user
  return true
}

export const isAdmin = ({ user }) => {
  if (user) {
    return user.roles.some(el => el === 'admin')
  } else {
    return false
  }
}

export const isVisitor = ({ user }) => {
  if (user) {
    return user.roles.some(el => el === 'Visitante')
  } else {
    return false
  }
}
