import Vue from 'vue'
import { Notify } from 'quasar'
// import Post from '../models/Post'
import Like from '../models/Like'
import Comment from '../models/Comment'
import { firestoreAction } from 'vuexfire'

// import { Notify } from 'quasar'
const vue = new Vue()

export const bindPosts = firestoreAction(context => {
  return context.bindFirestoreRef('posts', vue.$firestore.collection('posts').orderBy('creationDate', 'desc'))
})

export function addPost ({ state, commit, rootState }, post) {
  return new Promise((resolve, reject) => {
    if (!validate(post)) {
      return reject()
    }

    vue.$firestore.collection('posts').doc(post.id).set(post)
      .then(res => {
        // commit('ADD_POST', state.post)
        resolve()
        // commit('NEW_POST')
      })
  })
}

export async function setCurPost ({ commit, state }, postId) {
  const index = state.posts.findIndex(el => el.id === postId)
  commit('SET_CUR_POST', state.posts[index])
}

export function update ({ state, commit, dispatch }) {
  return new Promise((resolve, reject) => {
    if (validate(state.post)) {
      // commit('SET_STATE', 'selection')
      dispatch('justUpdatePost')
        .then(res => {
          resolve()
        })
    } else {
      reject()
    }
  })
}
export function justUpdatePost ({ state, commit }) {
  // commit('UPDATE_POST_IN_POSTS')
  return vue.$firestore.collection('posts').doc(state.curPost.id).set(state.curPost)
}

export async function saveFiles ({ state, commit, dispatch }, files) {
  commit('SET_FD_CUR_POST_FILES', files)
  dispatch('add')
}

export async function eraseFiles ({ state }) {
  state.curPost.files.forEach(el => {
    const ref = vue.$storage.ref(el.fullPath)
    // let ref = vue.$storage.ref().child('mural/' + state.curPost.id)
    ref.delete()
  })
}

function validate (post) {
  if (!post.message) {
    Notify.create({
      message: 'Informe a mensagem do post!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, actions: [{ icon: 'close', color: 'white', label: 'Fechar' }]
    })
    return false
  } else {
    return true
  }
}

// mural
// ========================================================================================

export function erasePost ({ state, commit, dispatch }, postId) {
  // dispatch('setCurPost', postId)
  // dispatch('eraseFiles')
  // console.log('postId', postId)
  vue.$firestore.collection('posts').doc(postId).delete()
    .then(res => {
      commit('ERASE_POST', postId)
      // commit('NEW_POST')
    })
}

// likes
// ========================================================================================
export function addLike ({ state, dispatch, rootState }, postId) {
  dispatch('setCurPost', postId)
  const index = state.curPost.likes.findIndex(el => el.owner.id === rootState.auth.user.id)
  if (index === -1) {
    const newLike = new Like()
    state.post.likes.push({ ...newLike })
    dispatch('justUpdatePost')
  } else {
    state.post.likes.splice(index, 1)
    dispatch('justUpdatePost')
  }
}

// comments
// ========================================================================================
export function addComment ({ state, dispatch }, comment) {
  const newComment = new Comment({ content: comment })
  state.curPost.comments.push({ ...newComment })
  dispatch('justUpdatePost')
}

export function eraseComment ({ state, dispatch }, index) {
  state.curPost.comments.splice(index, 1)
  dispatch('justUpdatePost')
}
