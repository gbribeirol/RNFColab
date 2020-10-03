import { Notify, uid } from 'quasar'
import Vue from 'vue'
import Project from '../models/Project'
import BasicUser from 'src/modules/user/models/BasicUser'
import Like from '../models/Like'
import Comment from '../models/Comment'
const vue = new Vue()

// const sendMailUrl = 'http://localhost:5000/snc-rnf/us-central1/sendMail'
// const sendMailUrl = 'http://localhost:5000/snc-rnf/us-central1/sendMail2'
const sendMailUrl = 'https://us-central1-snc-rnf.cloudfunctions.net/sendMail'

const emailTemplateHeader = `
  <div style="text-align: center; font-weight: bold; font-size: large;">
    {{title}}
  </div>
  <br>
  <br><b>Projeto:</b>
  <br>{{name}}
  <br>
  <br><b>Descrição:</b>
  <br>{{description}}
`
const emailTemplateProject = `
  ${emailTemplateHeader}
  <br>
  <br><b>Data início:</b>
  <br>{{startDate}}
  <br>
  <br><b>Data fim:</b>
  <br>{{endDate}}
  <br>
  <br><b>Participantes:</b>
  <br>{{participants}}
`
const emailTemplateReqs = `
  ${emailTemplateHeader}
  <br>
  <br><b>Requisitos (novos, estarão na cor azul):</b>
  <br>
  {{reqs}}
`

export function initProject ({ dispatch, commit, state }) {
  // if (!state.projects.length) {
  dispatch('loadProjects')
  // }
  commit('SET_CURRENT_FEATURE', 'Projetos', { root: true })
  commit('SET_FLAG', 'list')
}

export function loadProjects ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_LOADING', true)
    vue.$firestore.collection('constructions').get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => array.push(doc.data()))
        commit('SET_LIST', array)
        return resolve(array)
      })
      .catch(err => {
        return reject(err)
      })
      .finally(commit('SET_LOADING', false))
  })
}

export function newProject ({ state, commit }) {
  const myDate = vue.$serverDate().substring(0, 10)
  commit('SET_COPY', new Project({
    creationDate: vue.$serverDate(),
    startDate: myDate,
    endDate: myDate
  }))
  commit('SET_CURRENT_FEATURE', 'Novo Projeto', { root: true })
  // commit('SET_FD_CREATION_DATE', vue.$serverDate())
  // commit('SET_FD_START_DATE', vue.$serverDate())
  // commit('SET_FD_END_DATE', vue.$serverDate())
  commit('SET_FLAG', 'new')
  this.$router.push({ name: 'projectNew' })
}

export function addProject ({ state, commit }) {
  if (valid(state.copy)) {
    commit('SET_FD_ID', uid())
    commit('SET_FD_CREATION_DATE', vue.$serverDate())

    vue.$firestore.collection('constructions').doc(state.copy.id).set(state.copy).then(res => {
      commit('SET_SELECTED', state.copy)
      commit('ADD_LIST', state.copy)
      commit('SET_FLAG', 'update')
      this.$router.push({ name: 'project' })
    })
  }
}

export function selectProject ({ commit }, el) {
  commit('SET_SELECTED', el)
  commit('SET_FLAG', 'update')
  commit('SET_PARTICIPANT_FLAG', 'list')
  commit('SET_CURRENT_FEATURE', 'Edição de projeto', { root: true })
  this.$router.push({ name: 'projectEdit' })

  // if (this.isAdmin) {
  // } else {
  // this.$store.commit('project/SET_FLAG', 'show')
  // }}
}

export function startProject ({ state, commit, dispatch, rootState }) {
  commit('SET_FD_START_DATE', vue.$serverDate().substring(0, 10))
  commit('SET_FD_INITIATED', true)
  // dispatch('justUpdate')

  fetch(sendMailUrl, {
    method: 'post',
    body: JSON.stringify({
      from: rootState.app.email,
      to: state.copy.participants.map(e => `${e.name} <${e.email}>`),
      subject: `[Projeto: ${state.copy.name}] Construção iniciada`,
      html: emailTemplateProject
        .replace('{{title}}', 'CONSTRUÇÃO INICIADA')
        .replace('{{name}}', state.copy.name)
        .replace('{{description}}', state.copy.description)
        .replace('{{startDate}}', state.copy.startDate)
        .replace('{{endDate}}', state.copy.endDate)
        .replace('{{participants}}', state.copy.participants.map(e => ` ${e.name} (${e.roler})`))
    })
  })
}

export function finalizeProject ({ state, commit, dispatch, rootState }) {
  commit('SET_FD_END_DATE', vue.$serverDate().substring(0, 10))
  commit('SET_FD_FINISHED', true)
  commit('SET_FD_STATE', { label: 'Finalizada', value: '3' })
  dispatch('justUpdate')

  fetch(sendMailUrl, {
    method: 'post',
    body: JSON.stringify({
      from: rootState.app.email,
      to: state.copy.participants.map(e => `${e.name} <${e.email}>`),
      subject: `[Projeto: ${state.copy.name}] Construção finalizada`,
      html: emailTemplateProject
        .replace('{{title}}', 'CONSTRUÇÃO FINALIZADA')
        .replace('{{name}}', state.copy.name)
        .replace('{{description}}', state.copy.description)
        .replace('{{startDate}}', state.copy.startDate)
        .replace('{{endDate}}', state.copy.endDate)
        .replace('{{participants}}', state.copy.participants.map(e => ` ${e.name} (${e.roler})`))
    })
  })
}

export function sendNoticeReqCreated ({ state, commit, dispatch, rootState, rootGetters }) {
  commit('SET_FD_START_DATE', vue.$serverDate().substring(0, 10))
  commit('SET_FD_INITIATED', true)
  dispatch('justUpdate')

  const reqsStr = rootGetters['req/reqsFiltered']
    .map(e => (e.sentNotice ? '<div>' : '<div style="color: #0080ff">') + `${e.name}</div>`)
    .join('')

  fetch(sendMailUrl, {
    method: 'post',
    body: JSON.stringify({
      from: rootState.app.email,
      to: state.copy.participants.map(e => `${e.name} <${e.email}>`),
      subject: `[Projeto: ${state.copy.name}] RNF criado`,
      html: emailTemplateReqs
        .replace('{{title}}', 'RNF CRIADO')
        .replace('{{name}}', state.copy.name)
        .replace('{{description}}', state.copy.description)
        .replace('{{reqs}}', reqsStr)
    })
  })

  async function updateSentNotice () {
    await rootGetters['req/reqsFiltered'].forEach(e => {
      e.sentNotice = true
      vue.$firestore.collection('requirements').doc(e.id).set(e)
    })
  }
  updateSentNotice()

  dispatch('req/loadReqs', null, { root: true })
}

export function updateProject ({ state, commit, dispatch }) {
  return new Promise((resolve, reject) => {
    if (valid(state.copy)) {
      dispatch('justUpdate').then(res => resolve())
    } else {
      reject()
    }
  })
}
export function justUpdate ({ state, commit }) {
  commit('SET_SELECTED', state.copy)
  commit('UPDATE_LIST_ITEM')
  return vue.$firestore.collection('constructions').doc(state.copy.id).set(state.copy)
}

export function eraseProject ({ state, commit, dispatch }) {
  return vue.$firestore.collection('constructions').doc(state.selected.id).delete()
    .then(res => {
      commit('ERASE_ITEM_FROM_LIST')
      this.$router.push({ name: 'project' })
    })
}

function valid (item) {
  if (!item.name) {
    Notify.create({
      message: 'Informe o nome!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  if (!item.description) {
    Notify.create({
      message: 'Informe a descrição!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  if (item.participants.filter(e => e.roler === 'Moderator').length !== 1) {
    Notify.create({
      message: 'Informe um (somente um) participante Moderator!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  if (item.participants.filter(e => e.roler === 'Eng.Requisito').length === 0) {
    Notify.create({
      message: 'Informe pelo menos um participante Eng.Requisito!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  return true
}

export function updateFinishedProjects ({ state, commit, dispatch }) {
  // console.log('xz', state.projects.map(p => p.state.label))
  state.projects
    .filter(project => project.state.label === 'Iniciada' && vue.$serverDate().slice(0, 10) > project.endDate)
    .forEach(project => {
      commit('SET_SELECTED', project)
      commit('SET_FD_STATE', { value: '3', label: 'Finalizada' })
      dispatch('justUpdate')
      dispatch('req/updateFinalPositionOfAProject ', project, { root: true })
      // dispatch('position/updateFieldToConvergeOfAProject ', project, { root: true })
    })
}

/*
  Participants
*/

export function newParticipant ({ commit }) {
  commit('SET_PARTICIPANT', null)
  commit('SET_ROLER', '')
  commit('SET_PARTICIPANT_FLAG', 'new')
}

export function addParticipant ({ state, dispatch, commit, rootState }) {
  if (validParticipant(state.participant)) {
    const user = rootState.user.users.filter(e => e.id === state.participant.value)[0]
    const basicUser = new BasicUser(user)
    basicUser.roler = state.roler.value
    commit('ADD_PARTICIPANT', { ...basicUser })
    commit('SET_PARTICIPANT_FLAG', 'list')
  }
}

export function deleteParticipant ({ state, commit }) {
  state.participantSelected.forEach(participant => {
    const index = state.copy.participants.findIndex(e => e.id === participant.id)
    state.copy.participants.splice(index, 1)
  })
  commit('SET_PARTICIPANT_SELECTED', [])
  commit('SET_PARTICIPANT_FLAG', 'list')
}

function validParticipant (item) {
  // if (!item.name) {
  //   Notify.create({ message: `Informe o nome!`,
  //     position: 'bottom-right', type: 'warning',
  //     timeout: 3000, closeBtn: 'Fechar'
  //   })
  //   return false
  // }

  // if (!item.description) {
  //   Notify.create({ message: `Informe a descrição!`,
  //     position: 'bottom-right', type: 'warning',
  //     timeout: 3000, closeBtn: 'Fechar'
  //   })
  //   return false
  // }

  return true
}

/*
  Mural
  ========================================================================================
*/

export function muralLoad ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_LOADING', true)
    vue.$firestore.collection('posts')
      .orderBy('creationDate', 'desc')
      .limit(5)
      .get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => { array.push(doc.data()) })
        commit('SET_LIST', array)
        return resolve(array)
      })
      .catch(err => {
        return reject(err)
      })
      .finally(commit('SET_LOADING', false))
  })
}

export function muralLoadMore ({ state, commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_MURAL_LOADING', true)
    vue.$firestore.collection('posts')
      .orderBy('creationDate', 'desc')
      .limit(state.muralList.length + 5)
      .get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => { array.push(doc.data()) })
        commit('SET_MURAL_LIST', array)
        return resolve(array)
      })
      .catch(error => {
        return reject(error)
      })
      .finally(commit('SET_MURAL_LOADING', false))
  })
}

export function muralLoadAll ({ state, commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_MURAL_LOADING', true)
    vue.$firestore.collection('posts')
      .orderBy('creationDate', 'desc')
      .get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => { array.push(doc.data()) })
        commit('SET_MURAL_ALL_POST_LIST', array)
        return resolve(array)
      })
      .catch(error => {
        return reject(error)
      })
      .finally(commit('SET_MURAL_LOADING', false))
  })
}

export function muralAdd ({ state, commit, rootState }) {
  return new Promise((resolve, reject) => {
    state.muralPost.owner = { ...rootState.auth.basicUser }
    const newPost = { ...state.muralPost }
    commit('SET_MURAL_POST_MESSAGE', '')
    if (muralValidate(newPost)) {
      vue.$firestore.collection('posts').doc(newPost.id).set(newPost)
        .then(res => {
          commit('ADD_MURAL_LIST', newPost)
          commit('NEW_MURAL_POST')
          resolve(newPost)
        })
    } else {
      reject()
    }
  })
}

export async function muralSelect ({ commit, state }, postId) {
  const index = state.muralList.findIndex(el => el.id === postId)
  commit('SET_MURAL_SELECTED', state.muralList[index])
}

export function muralUpdate ({ state, commit, dispatch }) {
  return new Promise((resolve, reject) => {
    if (muralValidate(state.muralPost)) {
      // commit('SET_FD_STATE', 'selection')
      dispatch('muralJustUpdate')
        .then(res => {
          resolve()
        })
    } else {
      reject()
    }
  })
}
export function muralJustUpdate ({ state, commit }) {
  commit('UPDATE_LIST_ITEM')
  return vue.$firestore.collection('posts').doc(state.muralPost.id).set(state.muralPost)
}

export async function muralSaveFiles ({ state, commit, dispatch }, files) {
  commit('SET_MURAL_FILES', files)
  dispatch('muralAdd')
}

export async function muralEraseFiles ({ state }) {
  state.muralSelected.files.forEach(el => {
    const ref = vue.$storage.ref(el.fullPath)
    // let ref = vue.$storage.ref().child('posts/' + state.selected.id)
    ref.muralDelete()
  })
}

function muralValidate (post) {
  return true
  // if (!post.message) {
  //   Notify.create({ message: 'Informe a mensagem post!', position: 'bottom-right', type: 'warning',
  //     timeout: 3000, actions: [{ icon: 'close', color: 'white', label: 'Fechar' }]
  //   })
  //   return false
  // } else {
  //   return true
  // }
}

/*
  Posts
*/
export function muralErasePost ({ state, commit, dispatch }, postId) {
  dispatch('muralSelect', postId)
  dispatch('muralEraseFiles')
  vue.$firestore.collection('posts').doc(postId).delete()
    .then(res => {
      commit('ERASE_MURAL_LIST_ITEM')
      commit('NEW_MURAL_POST')
    })
}

/*
  likes
*/
export function muralAddLike ({ state, dispatch, rootState, commit }, postId) {
  dispatch('muralSelect', postId)
  const index = state.muralSelected.likes.findIndex(el => el.owner.id === rootState.auth.user.id)
  if (index === -1) {
    const newLike = new Like()
    state.muralPost.likes.push({ ...newLike })
    dispatch('muralJustUpdate')
  } else {
    state.muralPost.likes.splice(index, 1)
    dispatch('muralJustUpdate')
  }
}

/*
  comments
*/
export function muralAddComment ({ state, dispatch, rootState }) {
  const newComment = new Comment()
  newComment.content = state.muralComment

  state.post.comments.push({ ...newComment })
  dispatch('muralJustUpdate')
}

export function muralEraseComment ({ state, dispatch }, index) {
  state.muralPost.comments.splice(index, 1)
  dispatch('muralJustUpdate')
}

// import { Notify } from 'quasar'
// import Vue from 'vue'
// import Content from '../models/Content'
// const vue = new Vue()

// export function load ({ commit }) {
//   return new Promise((resolve, reject) => {
//     commit('SET_LOADING', true)
//     vue.$firestore.collection('library').get()
//       .then(snapshot => {
//         let array = []
//         snapshot.forEach(doc => array.push(doc.data()))
//         commit('SET_LIST', array)
//         return resolve(array)
//       })
//       .catch(err => {
//         return reject(err)
//       })
//       .finally(commit('SET_LOADING', false))
//   })
// }

// export function newContent ({ state, commit }) {
//   let newContent = new Content()
//   commit('SET_FLAG', 'new')
//   console.log(state.flag)
//   commit('SET_COPY', newContent)
// }

// export function addContent ({ state, commit }) {
//   if (validate(state.copy)) {
//     vue.$firestore.collection('library').doc(state.copy.id).set(state.copy).then(res => {
//       commit('SET_SELECTED', state.copy)
//       commit('ADD_LIST', state.copy)
//       commit('SET_FLAG', 'update')
//       this.$router.push({ name: 'library' })
//     })
//   }
// }

// export function erase ({ state, commit, dispatch }) {
//   dispatch('eraseFile')
//   commit('ERASE_ITEM_FROM_LIST')
//   return vue.$firestore.collection('library').doc(state.selected.id).delete()
//   // .then(res => {
//   //   dispatch('reset')
//   // })
// }

// export async function eraseFile ({ state, commit, dispatch }) {
//   let fileRef = vue.$storage.ref(state.selected.file.fullPath)
//   if (fileRef.name !== '') {
//     fileRef.delete().then(res => {
//       commit('SET_FILE', {})
//       // commit('SET_FLAG', 'update')
//       dispatch('justUpdate')
//     })
//   }
// }

// export function saveFile ({ state, commit, dispatch }, files) {
//   commit('SET_FILE', files[0])
//   dispatch('justUpdate')
//   // console.log(state.copy)
// }

// export function update ({ state, commit, dispatch }) {
//   return new Promise((resolve, reject) => {
//     if (validate(state.copy)) {
//       dispatch('justUpdate')
//         .then(res => {
//           // commit('SET_FLAG', 'update')
//           resolve()
//         })
//     } else {
//       reject()
//     }
//   })
// }

// export function justUpdate ({ state, commit }) {
//   commit('SET_SELECTED', state.copy)
//   commit('UPDATE_LIST_ITEM')
//   return vue.$firestore.collection('library').doc(state.copy.id).set(state.copy)
// }

// function validate (item) {
//   if (!item.name) {
//     Notify.create({ message: `Informe o nome!`,
//       position: 'bottom-right', type: 'warning',
//       timeout: 3000, actions: [{ icon: 'close', color: 'white', label: 'Fechar' }]
//     })
//     return false
//   } else {
//     return true
//   }
// }
