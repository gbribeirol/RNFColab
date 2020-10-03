// import BasicUser from 'src/modules/user/models/BasicUser'

export function basicList ({ users }) {
  return []
  // return users
  //   .map(el => {
  //     return { ...(new BasicUser(el)) }
  //   })
  //   .sort((a, b) => a.name > b.name ? 1 : -1)
}

export function level (statte) {
  return 0.3
}

// export const getExperienceLevel = (state, getters, rootState) => (userId) => {
//   if (!userId) {
//     return 0
//   }

//   let user = state.users.find(el => el.id === userId)
//   if (!user) {
//     return 0
//   }

//   if (!rootState.map.users) {
//     return 0
//   }

//   return user.rating.length / (rootState.map.users.length ? rootState.map.users.length : 1)
// }

// return new Promise((resolve, reject) => {
//   vue.$firestore.child('users')
//     .orderByChild('email')
//     .equalTo(user.email)
//     .once('value', function (snapshot) {
//       let result = snapshot.val()
//       if (result) {
//         return resolve()
//       } else {
//         return reject()
//       }
//     })
// })

// export function listOptions (state, getters) {
//   return getters.basicList
//     // .map(el => ({ label: el.name, value: el }))
//     .map(el => {
//       el.label = el.name
//       return el
//     })
// }

// import { getExpenses } from 'src/env/localforage'

// export function expenses_ () {
//   return getExpenses()
// }
// export const getColumns = (state) => {
//   state.users.columns
//     .map(el => el.name)
//     .filter(el => el !== 'id')
// }
