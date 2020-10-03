// import Post from '../models/Post'
// import Vue from 'vue'
// const vue = new Vue()

export const SET_SUPPORTED_FILE_TYPE = (state, param) => {
  state.supportedFileTypes = param
}
export const SET_SELECTED_FILE_TYPE = (state, param) => {
  state.selectedFileType = param
}
export const SET_MAIN_PATH = (state, param) => {
  state.mainPath = param
}
export const SET_FOLDER = (state, param) => {
  state.folder = param
}
export const SET_MULTIPLE = (state, param) => {
  state.multiple = param
}

// export const SET_LIST = (state, param) => { state.uploads = param }

// export const ADD_LIST = (state, param) => {
//   state.uploads.unshift(param)
//   // vue.$set(state.uploads, state.uploads.length, item)
// }

// export const UPDATE_LIST_ITEM = (state) => {
//   const index = state.uploads.findIndex(el => el.id === state.post.id)
//   vue.$set(state.uploads, index, state.post)
// }

// export const ERASE_LIST_ITEM = (state) => {
//   const index = state.uploads.findIndex(el => el.id === state.selected.id)
//   state.uploads.splice(index, 1)
// }

// export const SET_SELECTED = (state, param) => {
//   state.selected = param
//   state.post = { ...param }
// }

// export function NEW_POST (state) { state.post = new Post() }
// export function SET_MESSAGE (state, param) {
//   state.post.message = param
// }
// export function SET_COMMENT (state, param) { state.comment = param }

// export function SET_FILES (state, param) {
//   state.post.files = param
// }
