import { Notify, uid } from 'quasar'
import Vue from 'vue'
import Goal from '../models/Goal'
const vue = new Vue()

export function initGoal ({ dispatch, commit, state }) {
  // if (!state.goals.length) {
  dispatch('loadGoals')
  // }
  commit('SET_CURRENT_FEATURE', 'Catálogo', { root: true })
  commit('SET_STATE_FLAG', 'list')
}

export function loadGoals ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_LOADING', true)
    vue.$firestore.collection('goals').get()
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

export function newGoal ({ state, commit }) {
  commit('SET_COPY', new Goal())
  commit('SET_CURRENT_FEATURE', 'Novo catálogo', { root: true })
  commit('SET_STATE_FLAG', 'new')
  this.$router.push({ name: 'goalNew' })
}

export function addGoal ({ state, commit }) {
  if (validGoal(state.copy)) {
    commit('SET_ID', uid())
    vue.$firestore.collection('goals').doc(state.copy.id).set(state.copy).then(res => {
      commit('SET_SELECTED', state.copy)
      commit('ADD_LIST', state.copy)
      commit('SET_STATE_FLAG', 'update')
      this.$router.push({ name: 'goal' })
    })
  }
}

export function selectGoal ({ commit }, el) {
  commit('SET_SELECTED', el)
  commit('SET_STATE_FLAG', 'update')
  commit('SET_ASC_CORRELATION_STATE_FLAG', 'list')
  commit('SET_DES_CORRELATION_STATE_FLAG', 'list')
  commit('SET_CURRENT_FEATURE', 'Edição de catalogo', { root: true })
  this.$router.push({ name: 'goalEdit' })
  // if (this.isAdmin) {
  // } else {
  // this.$store.commit('goal/SET_STATE_FLAG', 'show')
  // }}
}

export function updateGoal ({ state, commit, dispatch }) {
  return new Promise((resolve, reject) => {
    if (validGoal(state.copy)) {
      // ASC CORRELATION
      state.copy.ascCorrelations.forEach((asc, idx) => {
        const ascGoal = state.goals.filter(g => g.id === asc.meta.value)[0]

        // se apagado
        if (asc.deleted) {
          // apagar meta atual (como descendente), na meta ascendente
          const index = ascGoal.desCorrelations.findIndex(d => d.meta.value === state.copy.id)
          if (index !== -1) {
            ascGoal.desCorrelations.splice(index, 1)
            vue.$firestore.collection('goals').doc(ascGoal.id).set(ascGoal)
          }

          // apagar ascendente na meta atual
          state.copy.ascCorrelations.splice(idx, 1)
        }

        // se incluido
        if (asc.added) {
          // inclui meta atual (como descendente), na meta ascendente
          ascGoal.desCorrelations.push({
            meta: { label: state.copy.name, value: state.copy.id },
            correlation: asc.correlation
          })
          vue.$firestore.collection('goals').doc(ascGoal.id).set(ascGoal)

          // apaga flag added
          delete asc.added
        }
      })

      // DES CORRELATION
      state.copy.desCorrelations.forEach((des, idx) => {
        const desGoal = state.goals.filter(g => g.id === des.meta.value)[0]

        // se apagado
        if (des.deleted) {
          // apagar meta atual (como ascendente), na meta descendente
          const index = desGoal.ascCorrelations.findIndex(d => d.meta.value === state.copy.id)
          if (index !== -1) {
            desGoal.ascCorrelations.splice(index, 1)
            vue.$firestore.collection('goals').doc(desGoal.id).set(desGoal)
          }

          // apagar descendente na meta atual
          state.copy.desCorrelations.splice(idx, 1)
        }

        // se incluido
        if (des.added) {
          // inclui meta atual (como ascendente), na meta descendente
          desGoal.ascCorrelations.push({
            meta: { label: state.copy.name, value: state.copy.id },
            correlation: des.correlation
          })
          vue.$firestore.collection('goals').doc(desGoal.id).set(desGoal)

          // apaga flag added
          delete des.added
        }
      })

      dispatch('justUpdate').then(res => resolve())
    } else {
      reject()
    }
  })
}
export function justUpdate ({ state, commit }) {
  commit('UPDATE_LIST_ITEM', state.copy)
  commit('SET_SELECTED', state.copy)
  return vue.$firestore.collection('goals').doc(state.copy.id).set(state.copy)
  // .then(r => {
  //   console.log('state.copy.ascCorrelations', state.copy.ascCorrelations)
  //   console.log('state.copy.desCorrelations', state.copy.desCorrelations)
  // })
}

export function eraseGoal ({ state, commit, dispatch }) {
  return vue.$firestore.collection('goals').doc(state.selected.id).delete()
    .then(res => {
      commit('ERASE_ITEM_FROM_LIST')
      this.$router.push({ name: 'goal' })
    })
}

function validGoal (item) {
  if (!item.name) {
    Notify.create({
      message: 'Informe o nome!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

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
  correlations
*/
function validCorrelation (item) {
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
  ascending correlations
*/
export function newAscCorrelation ({ commit }) {
  commit('SET_CORRELATED', null)
  commit('SET_CORRELATION', null)
  commit('SET_ASC_CORRELATION_STATE_FLAG', 'new')
}
export function addAscCorrelation ({ state, commit }) {
  if (validCorrelation(state.copy)) {
    commit('ADD_ASC_CORRELATION', { meta: state.correlated, correlation: state.correlation, added: true })
    commit('SET_ASC_CORRELATION_STATE_FLAG', 'list')
  }
}
export function deleteAscCorrelation ({ state, commit }) {
  state.ascCorrelationSelected.forEach(el => {
    commit('DELETE_ASC_CORRELATION', el)
  })
  commit('SET_ASC_CORRELATION_SELECTED', [])
  commit('SET_ASC_CORRELATION_STATE_FLAG', 'list')
}

/*
  descending correlations
*/
export function newDesCorrelation ({ commit }) {
  commit('SET_CORRELATED', null)
  commit('SET_CORRELATION', null)
  commit('SET_DES_CORRELATION_STATE_FLAG', 'new')
}
export function addDesCorrelation ({ state, commit }) {
  if (validCorrelation(state.copy)) {
    commit('ADD_DES_CORRELATION', { meta: state.correlated, correlation: state.correlation, added: true })
    commit('SET_DES_CORRELATION_STATE_FLAG', 'list')
  }
}
export function deleteDesCorrelation ({ state, commit }) {
  state.desCorrelationSelected.forEach(el => {
    commit('DELETE_DES_CORRELATION', el)
  })
  commit('SET_DES_CORRELATION_SELECTED', [])
  commit('SET_DES_CORRELATION_STATE_FLAG', 'list')
}
