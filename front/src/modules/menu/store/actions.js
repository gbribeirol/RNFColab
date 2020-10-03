// // import Vue from 'vue'
// import { http } from 'src/http/axios'

// export function loadPosts ({ commit }) {
//   commit('LOADING', true)

//   http.get('posts')
//     .then(res => commit('POSTS', res.data))
//     .catch(error => console.error(error.code, error.message))
//     .finally(() => commit('LOADING', false))
// }

// import { add } from 'src/env/localforage'

// export function addExpense_ (context, obj) {
//   addExpense(obj)
// }
// export const someAction = (state) => {
// }
