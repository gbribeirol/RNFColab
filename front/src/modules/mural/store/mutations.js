// import Vue from 'vue'
// const vue = new Vue()

export const ADD_POST = (state, param) => {
  state.posts.unshift(param)
  // vue.$set(state.posts, state.posts.length, item)
}

// export const UPDATE_POST_IN_POSTS = (state) => {
//   const index = state.posts.findIndex(el => el.id === state.post.id)
//   vue.$set(state.posts, index, state.post)
// }

export const ERASE_POST = (state, postId) => {
  const index = state.posts.findIndex(el => el.id === postId)
  state.posts.splice(index, 1)
}

export const SET_CUR_POST = (state, param) => {
  state.curPost = param
}

export function SET_POST_SEARCH_TERM (state, param) {
  state.postSearchTerm = param
}
export function SET_POST_SORT_FIELD (state, param) {
  state.postSortField = param
}
export function SET_FD_CUR_POST_MESSAGE (state, param) {
  state.curPost.files = param
}
