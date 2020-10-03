import { Notify } from 'quasar'
import Vue from 'vue'
import User from 'src/modules/user/models/User'
const vue = new Vue()

export function createAuthWithEmail ({ state, dispatch, commit }, user) {
  return new Promise(resolve => {
    dispatch('validateEmailAccount', user)
      .then(() => {
        vue.$auth.createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
            user.id = res.user.uid
            return resolve(user)
            // dispatch('user/createUser', user, { root: true }).then(res => {
            //   commit('SET_USER', user)
            //   Notify.create({
            //     message: `Bem vindo '${state.name}'!`,
            //     position: 'bottom-right',
            //     color: 'positive',
            //     timeout: 5000,
            //     closeBtn: 'Fechar'
            //   })
            // })
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Notify.create({
                message: `Email ${user.email} já cadastrado no 'Auth'!`,
                position: 'bottom-right',
                color: 'amber-7',
                timeout: 5000,
                closeBtn: 'Fechar'
              })
            } else if (error.code === 'auth/invalid-email') {
              Notify.create({
                message: `'Email ${user.email} inválido`,
                position: 'bottom-right',
                color: 'amber-7',
                timeout: 5000,
                closeBtn: 'Fechar'
              })
            } else {
              Notify.create({
                message: `Problema ao adicionar '${user.email}' no 'Auth'! ` + error.message,
                position: 'bottom-right',
                color: 'red-5',
                timeout: 5000,
                closeBtn: 'Fechar'
              })
            }
          })
      })
      .catch(error => {
        Notify.create({
          message: error.message,
          position: 'bottom-right',
          color: 'amber-7',
          timeout: 5000,
          closeBtn: 'Fechar'
        })
      })
  })
}

export function signInByEmail ({ state, commit, dispatch, rootState }, user) {
  return new Promise((resolve, reject) => {
    dispatch('validateEmailPassword', user).then(res => {
      vue.$auth.signInWithEmailAndPassword(user.email, user.password).then(res => {
        dispatch('user/getUserByEmail', user.email, { root: true }).then(user => {
          commit('SET_USER', user)
          Notify.create({
            message: 'Autenticação realizada!',
            position: 'bottom-right',
            color: 'positive',
            timeout: 100
          })

          // dispatch('initApp', null, { root: true })

          if (rootState.app.version !== rootState.app.firestore[0].version) {
            this.$router.push({ name: 'outdatedApp' })
          } else {
            return resolve()
          }
        }).catch(error => {
          console.error(error.code, error.message)
          Notify.create({
            message: 'Usuário não encontrado!',
            position: 'bottom-right',
            color: 'amber-7',
            timeout: 2000,
            closeBtn: 'Fechar'
          })
          return reject()
        })
      }).catch(error => {
        console.error(error.code, error.message)
        Notify.create({
          message: 'Falha na autenticação!',
          position: 'bottom-right',
          color: 'amber-7',
          timeout: 2000,
          closeBtn: 'Fechar'
        })
        return reject()
      })
    }).catch(error => {
      Notify.create({
        message: error.message,
        position: 'bottom-right',
        color: 'amber-7',
        timeout: 5000,
        closeBtn: 'Fechar'
      })
      return reject()
    })
  })
}

// tem que ativar os provides no firebase e inputar o idClient e keyScrety no site do provider ()
export function signInByProvider ({ dispatch, commit }, provider) {
  return new Promise((resolve, reject) => {
    // Notify.create({ message: 'AUTENTICAÇÃO EM ANDAMENTO...',
    //   position: 'center', color: 'positive',
    //   multiLine: true,
    //   timeout: 10000
    // })
    vue.$auth
      .signInWithPopup(provider) // existe uma opção com redirect
      .then(res => {
        // pode ser armazenado no localstorage pelo cmd setItem
        // console.log(res.credential.accessToken)
        // let token = result.credential.accessToken
        dispatch('user/getUserById', res.user.uid, { root: true })
          .then(user => {
            if (!user) {
              const newUser = new User({
                id: res.user.uid,
                name: res.user.displayName,
                email: res.user.email,
                phoneNumber: res.user.phoneNumber,
                photoURL: res.user.photoURL
              })
              dispatch('user/createUser', { ...newUser }, { root: true })
                .then(res => {
                  commit('SET_USER', newUser)
                  Notify.create({
                    message: `Bem vindo '${newUser.name}'!`,
                    position: 'bottom-right',
                    color: 'positive',
                    timeout: 10000,
                    closeBtn: 'Fechar'
                  })
                  this.$router.push({ name: 'mural' })
                })
            } else {
              commit('SET_USER', user)
              Notify.create({
                message: 'Autenticação realizada!',
                position: 'bottom-right',
                color: 'positive',
                timeout: 100
              })
              this.$router.push({ name: 'mural' })
            }
          })
          .catch(error => {
            console.error(error.code, error.message)
            Notify.create({
              message: 'Falha na autenticação por email, no firebase!',
              position: 'bottom-right',
              color: 'amber-7',
              timeout: 2000,
              closeBtn: 'Fechar'
            })
          })
      })
      .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          Notify.create({
            message: 'Usuário já existe com outro tipo de credencial. Tente atenticar através do email ou outra rede social!',
            position: 'bottom-right',
            color: 'amber-7',
            timeout: 10000,
            closeBtn: 'Fechar'
          })
        } else {
          console.error(error.code, error.message)
        }
      })
  })
}
export function signInByGithub ({ dispatch }) {
  const provider = new vue.$auth.GithubAuthProvider()
  dispatch('signInByProvider', provider)
}
export function signInByGoogle ({ dispatch }) {
  const provider = new vue.$firebase.auth.GoogleAuthProvider()
  dispatch('signInByProvider', provider)
}
export function signInByFacebook ({ dispatch }) {
  const provider = new vue.$firebase.auth.FacebookAuthProvider()
  // provider.addScope('repo')
  // provider.addScope('user_birthday')
  dispatch('signInByProvider', provider)
}
export function signInByTwiter ({ dispatch }) {
  const provider = new vue.$firebase.auth.TwitterAuthProvider()
  dispatch('signInByProvider', provider)
}

export function sendPassword ({ dispatch, state }) {
  return new Promise(resolve => {
    dispatch('validateSendPassword').then(() => {
      vue.$auth.sendPasswordResetEmail(state.email).then(() => {
        Notify.create({
          message: 'Enviado email de redefinição de senha!',
          position: 'bottom-right',
          color: 'positive',
          timeout: 5000,
          closeBtn: 'Fechar'
        })
        return resolve()
      }).catch(error => {
        if (error.code === 'auth/invalid-email') {
          Notify.create({
            message: 'Email inválido',
            position: 'bottom-right',
            color: 'amber-7',
            timeout: 5000,
            closeBtn: 'Fechar'
          })
        }
      })
    })
  })
}
export function validateSendPassword ({ state }) {
  return new Promise(resolve => {
    if (!state.email) {
      throw new Error('Email não informado')
    } else {
      return resolve()
    }
  })
}

export function signOut ({ commit }) {
  vue.$auth
    .signOut()
    .then(result => {
      commit('SET_USER', null)
      this.$router.push({ name: 'authLoginForm' })
    })
}

export function onChangeAuth ({ commit, dispatch }) {
  vue.$auth.onAuthStateChanged(user => {
    if (user) {
      // dispatch('setUserByKey', 0)
    } else {
      // dispatch('setUserByKey', user.uid)
    }
  })
}

export function loginAdmin ({ state, commit, dispatch, rootState }) {
  commit('SET_EMAIL', '123456')
  commit('SET_PASSWORD', '123456')
  dispatch('signInByEmail')
}
export function loginGui ({ state, commit, dispatch, rootState }) {
  commit('SET_EMAIL', 'guilhermefrade@gmail.com')
  commit('SET_PASSWORD', '123456')
  dispatch('signInByEmail')
}
export function loginJoao ({ state, commit, dispatch, rootState }) {
  commit('SET_EMAIL', 'joao.o.frade@gmail.com')
  commit('SET_PASSWORD', '123456')
  dispatch('signInByEmail')
}

export function setUserByKey ({ commit }, param) {
  if (param) {
    vue.$firestore.child('/users/' + param)
      .once('value')
      .then(function (snapshot) {
        // console.log('=============================================================')
        // console.log('setUserByKey: usuário autenticado foi encontrado (cadastrado)')
        // console.log(snapshot.val())
        commit('SET_USER', new User(snapshot.val()))
      })
      .catch(() => {
        commit('SET_USER', new User({ id: param }))
      })

    // vue.$firestore.child('users')
    //   .orderByChild('key')
    //   .equalTo(param)
    //   .on('child_added', function (snapshot) {
    //     console.log('=============================================================')
    //     console.log('setUserByKey: usuário autenticado foi encontrado (cadastrado)')
    //     console.log(snapshot.val())
    //     commit('SET_USER', new User(snapshot.val()))
    //   })
    //   .catch(() => {
    //     commit('SET_USER', new User({ id: param }))
    //   })

    // vue.$firestore.ref('users').child(param)
    //   .once('child_added', snapshot => {
    //     console.log(snapshot.val())
    //   })
    // vue.$firestore.child('users')
    //   .orderByChild('key')
    //   .equalTo(param)
    //   .once('child_added', snapshot => {
    //     console.log(snapshot.val())
    //   })
    // vue.$firestore.ref('users').child(param)
    //   .once('value')
    //   .then(function (snapshot) {
    //     console.log(snapshot)
    //     // commit('SET_USER', snapshot.val())
    //   })

    // promise
    // vue.$firestore.child('users')
    //   .orderByChild('key')
    //   .equalTo(param)
    //   .on('child_added').then(snapshot => {
    //     let x = new User(snapshot.val())
    //     x.key = param
    //     console.log(x)
    //     commit('SET_USER', x)
    //   }).catch(err => console.log('------', err))

    // vue.$firestore.child('users')
    //   .orderByChild('key')
    //   .equalTo(param)
    //   .on('child_added').then(snapshot => {
    //     snapshot.array.forEach(el => {
    //       const post = el.val()
    //       post.id = el.key
    //       console.log(post.id)
    //     })
    //     // snapshot.forEach(snapshot) {
    //     //   const post = snapshot.val()
    //     //   post.id = snapshot.key
    //     //   console.log(post.id)
    //     // })
    //     console.log(snapshot.val())
    //   })
  } else {
    commit('SET_USER', null)
  }
}

// export function signInAnonymously ({ state }, param) {
//   vue.$auth
//     .signInAnonymously(param.user.email + state.suffix, param.user.password)
//     .then(function (result) {
//       console.log(result)
//       alert('bem vindo desconhecido')
//     })
//     .catch(() => {
//       // console.error(error.code)
//       // console.error(error.message)
//       alert('falha na autenticação anônima')
//     })
// }

// export function signOut = ({ commit }) {
//   let self = this
//   vue.$auth
//     .signOut()
//     .then(result => {
//       console.log('tachau')
//       // commit('SET_USER', null)
//       self.$router.push({ name: 'authLoginForm' })
//     })
//     .catch(function (error) {
//       console.log('não saiu')
//       console.log(error)
//       // console.log(error.message)
//     })
// }

// vue.$auth.onAuthStateChanged(user => {
//   if (!user) {
//     // vue.$store.dispatch('auth/setUserByKey', '')
//     console.log(user)
//     this.$router.push({ name: 'authLoginForm' })
//   } else {
//     console.log(user)
//     // vue.$store.dispatch('auth/setUserByKey', user.uid)
//     this.$router.push({ name: 'mural' })
//   }
// })

// vue.$auth.signInWithEmailAndPassword(
//   'joao.o.frade@gmail.com', '123456'
// )

// vue.$auth.signInWithEmailAndPassword(
//   'joao.o.frade@gmail.com', '123456'
// )
// console.log(vue.$auth.currentUser !== null)

// this.$router.push({ name: 'authLoginForm' })

// Validações

export function validateEmailAccount ({ dispatch }, user) {
  return new Promise(resolve => {
    if (!user.name) {
      throw new Error('Nome não informado')
    }

    dispatch('validateEmailPassword', user).then(res => {
      return resolve()
    })
  })
}

export function validateEmailPassword (context, user) {
  return new Promise((resolve, reject) => {
    if (!user.email) {
      throw new Error('Email não informado')
    } else if (!user.password) {
      throw new Error('Senha não informada')
    } else {
      return resolve()
    }
  })
}
