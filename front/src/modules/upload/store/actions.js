export function uploadFile ({ getters }, file, updateProgress) {
  const self = this

  return new Promise((resolve, reject) => {
    const task = self.$storage.ref(getters.fullPathStore).put(file)
    task.on('state_changed',
      function progress (snapshot) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes)
        updateProgress(percent)
      },
      function error (err) {
        reject(err)
      },
      function complete () {
        resolve(file)
        // self.fileName = file.name
        // Notify.create({ message: 'Upload completo!', position: 'top-right', type: 'positive',
        //   timeout: 1000, actions: [{ icon: 'close', color: 'white', label: 'Fechar' }]
        // })
      }
    )
  })
}

export function setSupportedFileTypes ({ state, commit, getters }, supportedFileTypes) {
  commit('SET_SUPPORTED_FILE_TYPE', supportedFileTypes)
  const selected = []
  state.fileTypes.forEach(e => {
    if (supportedFileTypes.includes(e.value)) {
      selected.push(e)
    }
  })
  commit('SET_SELECTED_FILE_TYPE', selected)
  // if (getters.fileTypesFiltered.length > 0) {
  //   commit('SET_SELECTED_FILE_TYPE', getters.fileTypesFiltered[0])
  // }
}

// import Vue from 'vue'
// // import Post from '../models/Post'
// import Like from '../models/Like'
// import Comment from '../models/Comment'
// // import { Notify } from 'quasar'
// const vue = new Vue()

// export function load ({ commit }) {
//   return new Promise((resolve, reject) => {
//     commit('SET_LOADING', true)
//     vue.$firestore.collection('posts')
//       .orderBy('creationDate', 'desc')
//       .get()
//       .then(snapshot => {
//         let array = []
//         snapshot.forEach(doc => { array.push(doc.data()) })
//         commit('SET_LIST', array)
//         return resolve(array)
//       })
//       .catch(err => {
//         return reject(err)
//       })
//       .finally(commit('SET_LOADING', false))
//   })
// }

// export function add ({ state, commit, rootState }) {
//   return new Promise((resolve, reject) => {
//     state.post.owner = { ...rootState.auth.basicUser }
//     let newPost = { ...state.post }
//     commit('SET_MESSAGE', '')
//     if (validate(newPost)) {
//       vue.$firestore.collection('posts').doc(newPost.id).set(newPost)
//         .then(res => {
//           commit('ADD_LIST', newPost)
//           commit('NEW_POST')
//           resolve(newPost)
//         })
//     } else {
//       reject()
//     }
//   })
// }

// export async function select ({ commit, state }, postId) {
//   const index = state.uploads.findIndex(el => el.id === postId)
//   commit('SET_SELECTED', state.uploads[index])
// }

// export function update ({ state, commit, dispatch }) {
//   return new Promise((resolve, reject) => {
//     if (validate(state.post)) {
//       // commit('SET_STATE', 'selection')
//       dispatch('justUpdate')
//         .then(res => {
//           resolve()
//         })
//     } else {
//       reject()
//     }
//   })
// }
// export function justUpdate ({ state, commit }) {
//   commit('UPDATE_LIST_ITEM')
//   return vue.$firestore.collection('posts').doc(state.post.id).set(state.post)
// }

// export function erase ({ state, commit, dispatch }, postId) {
//   dispatch('select', postId)
//   dispatch('eraseFiles')
//   vue.$firestore.collection('posts').doc(postId).delete()
//     .then(res => {
//       commit('ERASE_LIST_ITEM')
//     })
// }

// export async function saveFiles ({ state, commit, dispatch }, files) {
//   debugger
//   commit('SET_FILES', files)
//   dispatch('add')
// }

// export async function eraseFiles ({ state }) {
//   state.selected.files.forEach(el => {
//     let ref = vue.$storage.ref(el.fullPath)
//     // let ref = vue.$storage.ref().child('posts/' + state.selected.id)
//     ref.delete()
//   })
// }

// function validate (post) {
//   return true
//   // if (!post.message) {
//   //   Notify.create({ message: 'Informe a mensagem post!', position: 'bottom-right', type: 'warning',
//   //     timeout: 3000, actions: [{ icon: 'close', color: 'white', label: 'Fechar' }]
//   //   })
//   //   return false
//   // } else {
//   //   return true
//   // }
// }

// // likes
// // ========================================================================================
// export function addLike ({ state, dispatch, rootState }, postId) {
//   dispatch('select', postId)
//   const index = state.selected.likes.findIndex(el => el.owner.id === rootState.auth.user.id)
//   if (index === -1) {
//     let newLike = new Like()
//     state.post.likes.push({ ...newLike })
//     dispatch('justUpdate')
//   } else {
//     state.post.likes.splice(index, 1)
//     dispatch('justUpdate')
//   }
// }

// // comments
// // ========================================================================================
// export function addComment ({ state, dispatch, rootState }) {
//   let newComment = new Comment()
//   newComment.content = state.comment

//   state.post.comments.push({ ...newComment })
//   dispatch('justUpdate')
// }

// export function eraseComment ({ state, dispatch }, index) {
//   state.post.comments.splice(index, 1)
//   dispatch('justUpdate')
// }
