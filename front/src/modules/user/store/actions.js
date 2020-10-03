// import { firestoreAction } from 'vuexfire'
import { Notify } from 'quasar'
import User from '../models/User'
import BasicUser from '../models/BasicUser'
import Vue from 'vue'
const vue = new Vue()

function validate (item) {
  if (!item.name) {
    Notify.create({
      message: 'Informe o nome!',
      position: 'bottom-right',
      color: 'amber-7',
      timeout: 3000,
      closeBtn: 'Fechar'
    })
    return false
  // } else if (!item.email) {
  //   Notify.create({ message: 'Informe o email!',
  //     position: 'bottom-right', color: 'amber-7',
  //     timeout: 3000, closeBtn: 'Fechar'
  //   })
  //   return false
  } else {
    return true
  }
}

// export const bindTodosRef = firestoreAction(context => {
//   return context.bindFirestoreRef('list', vue.$firestore.collection('users'))
// })

export function newItem ({ commit }) {
  commit('SET_COPY', new User())
  commit('SET_STATE', 'new')
}

export async function createUserWithEmail ({ state, commit, dispatch }, user) {
  dispatch('auth/createAuthWithEmail', user, { root: true })
    .then(userWithNewId => {
      dispatch('createUser', userWithNewId)
    })
}

export async function createUser ({ state, commit }, user) {
  return vue.$firestore.collection('users').doc(user.id).set({ ...user }).then(res => {
    commit('ADD_LIST', user)
    Notify.create({
      message: `Usuário '${user.name}' adicionado com sucesso!`,
      position: 'bottom-right',
      type: 'positive',
      timeout: 5000,
      closeBtn: 'Fechar'
    })
  }).catch(error => {
    console.log(user.name + ' - ' + error.message)
    Notify.create({
      message: `Problema ao adicionar '${user.name}' a coleção de usuários!`,
      position: 'bottom-right', type: 'warning',
      timeout: 5000, closeBtn: 'Fechar'
    })
  })
}

export function select ({ state, commit }, id) {
  const index = state.users.findIndex(el => el.id === id)
  const item = state.users[index]

  commit('SET_SELECTED', item)
  commit('SET_STATE', 'edit')
}

export function updateByParam ({ state, commit, dispatch }, user) {
  commit('SET_COPY', user)
  dispatch('update')
}

export function updateAvatar ({ state, commit, dispatch, rootState }, files) {
  commit('auth/SET_AVATAR_URL', files.url, { root: true })
  dispatch('updateByParam', rootState.auth.user)
}

export function update ({ state, commit }) {
  return new Promise((resolve, reject) => {
    if (validate(state.copy)) {
      commit('SET_SELECTED', state.copy)
      commit('UPDATE_LIST_ITEM')
      commit('auth/SET_USER', state.copy, { root: true })
      commit('SET_STATE', 'selection')
      vue.$firestore.collection('users').doc(state.copy.id).update(state.copy)
        .then(res => {
          resolve()
        })
    } else {
      reject()
    }
  })
}

export function erase ({ state, commit, dispatch }) {
  commit('ERASE_ITEM_FROM_LIST')
  vue.$firestore.collection('users').doc(state.selected.id).delete()
    .then(res => {
      dispatch('reset')
    })
}

export function reset ({ commit }) {
  commit('SET_SELECTED', {})
  commit('SET_STATE', 'selection')
}

export function getUserByEmail ({ commit }, email) {
  return new Promise((resolve, reject) => {
    vue.$firestore.collection('users')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            return resolve(doc.data())
          })
        } else {
          reject()
        }
      })
  })
}
export function getUserById ({ commit }, id) {
  return new Promise((resolve, reject) => {
    vue.$firestore.collection('users').doc(id)
      .get()
      .then(doc => {
        return resolve(doc.data())
      })
      .catch(error => {
        return reject(error)
      })
  })
}

export function set (state, param) {
  vue.$firestore.child(`users/${param.id}`).update(param)
}

export function load ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_LOADING', true)
    vue.$firestore.collection('users')
      .orderBy('name')
      .get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => array.push(doc.data()))
        commit('SET_LIST', array)
        console.log('Lista de usuários carregada!')
        return resolve(array)
      })
      .catch(error => {
        return reject(error)
      })
      .finally(commit('SET_LOADING', false))
  })
}

export function isThereUser (user) {
  return new Promise((resolve, reject) => {
    vue.$firestore.collection('users')
      .where('email', '==', user.email)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.data()
        })
        // commit('SET_LIST', array)
      })
  })
}

export function convertUserToBasicUser (user) {
  const basicUser = new BasicUser(user)
  return basicUser
}

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

// vue.use(Store)
// const store = new Store()

// import { http } from 'src/http/axios'

// export function loadPosts ({ commit }) {
//   commit('LOADING', true)

//   http.get('posts')
//     .then(res => commit('POSTS', res.data))
//     .catch(err => console.error(error))
//     .finally(() => commit('LOADING', false))
// }

// import { add } from 'src/env/localforage'

// export function addExpense_ (context, obj) {
//   addExpense(obj)
// }

// function zeroPad (num, places) {
//   var zero = places - num.toString().length + 1
//   return Array(+(zero > 0 && zero)).join('0') + num
// }

// export const createAuthAndUserWithEmail = (user) => {
//   let newUser = new User(user)

//   isThereUser(newUser)
//     .then(el => {
//       Notify.create({ color: 'red-5', message: 'Usuário já existe!', position: 'bottom-right',
//         timeout: 3000, closeBtn: 'Fechar' })
//     })
//     .catch(() => {
//       Notify.create({ color: 'red-5', message: 'Usuário já existe!', position: 'bottom-right',
//         timeout: 3000, closeBtn: 'Fechar' })

//       newUser.id = vue.$firestore.child('users').push().key
//       vue.$firestore.child(`users/${newUser.id}`).set(newUser)

//       // let xx = vue.$firestore.child('users').push()
//       // user.id = xx.key
//       // xx.set({ name: 'sfsd', sfsdds: 'sfsdf' })
//     })
// }

// export function createAuthAndUserWithEmail ({ state, commit, dispatch, rootState }, user) {
//   const newUser = { ...(new User(user)) }
//   console.log(newUser)
//   vue.$auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
//     .then(res => {
//       newUser.id = res.newUser.uid
//       console.log(res.newUser)
//       dispatch('add', user)
//     })
//     .catch(error => {
//       Notify.create({ message: `Problema ao adicionar '${newUser.name}' no 'Auth' do firebase! ` + error.message,
//         position: 'bottom-right',
//         color: 'amber-7',
//         timeout: 10000,
//         closeBtn: 'Fechar'
//       })
//     })

//   // dispatch('updateByParam', user)
// }
