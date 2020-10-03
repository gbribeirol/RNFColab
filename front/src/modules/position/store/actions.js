import { Notify, uid } from 'quasar'
import Vue from 'vue'
import Position from '../models/Position'
import Classification from '../models/Classification'
// import BasicUser from 'src/modules/user/models/BasicUser'
import getPositionsOfAReq from 'src/modules/position/helpers/getPositionsOfAReq'

const vue = new Vue()

export function initPosition ({ dispatch, commit, state, rootState }) {
  if (!rootState.goal.goals.length) {
    dispatch('goal/loadGoals', null, { root: true })
  }
  if (!rootState.project.projects.length) {
    dispatch('project/loadProjects', null, { root: true })
  }
  if (!rootState.req.reqs.length) {
    dispatch('req/loadReqs', null, { root: true })
  }
  // if (!state.positions.length) {
  dispatch('loadPositions')
  // }

  commit('SET_POSITION_FLAG', 'list')
}

export function loadPositions ({ commit }) {
  return new Promise((resolve, reject) => {
    vue.$firestore.collection('positions').get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => array.push(doc.data()))
        commit('SET_POSITIONS', array)

        // copia coleção positions
        // ====================================================================
        // array.forEach(pos => {
        //   vue.$firestore.collection('positions2').doc(pos.id).set(pos)
        // })

        return resolve(array)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

export function newPosition ({ commit, rootState }) {
  const { id, name } = rootState.project.selected
  const position = new Position({
    id: uid(),
    construction: { label: name, value: id },
    req: { label: rootState.req.copy.name, value: rootState.req.copy.id },
    type: 'Requisito',
    creationDate: vue.$serverDate()
  })
  commit('SET_CUR_POSITION_CP', position)
  commit('SET_CURRENT_FEATURE', 'Nova posição', { root: true })
  commit('SET_POSITION_FLAG', 'new')
  // this.$router.push({ name: 'positionNew' })
}

export function addPosition ({ state, commit, dispatch }) {
  // if (valid(state.curPositionCp)) {
  // eslint-disable-next-line no-constant-condition
  // if (true) {
  vue.$firestore.collection('positions').doc(state.curPositionCp.id).set(state.curPositionCp).then(res => {
    commit('SET_CUR_POSITION', state.curPositionCp)
    commit('ADD_POSITION', state.curPositionCp)
    commit('SET_POSITION_FLAG', 'list')
    // commit('SET_POSITION_FLAG', 'update')
    // dispatch('req/updateState', null, { root: true })
    dispatch('req/justUpdate', null, { root: true })
    // this.$router.push({ name: 'position' })
  })
  // }
}

export function selectPosition ({ commit }, param) {
  commit('SET_CUR_POSITION', param.el)
  commit('SET_CUR_POSITION_CP', param.el)
  commit('SET_POSITION_FLAG', 'update')
  // commit('SET_GOAL_STATE_FLAG', 'list')
  commit('SET_CURRENT_FEATURE', 'Edição de posição', { root: true })
  if (!param.rota) {
    this.$router.push({ name: 'positionEdit' })
  // } else {
  //   this.$router.push({ name: param.rota })
  }
  // if (this.isAdmin) {
  // } else {
  // this.$store.commit('req/SET_STATE_FLAG', 'show')
  // }}
}

export function updateFieldToConvergeOfAProject ({ rootGetters }, param) {
  const reqs = rootGetters['req/projectReqsCalcFields']
  const positions = rootGetters['position/projectPositions']

  reqs.forEach(req => {
    const positionsOfAReq = getPositionsOfAReq(positions, req.id)

    const numberOfPositioningByType = []
    positionsOfAReq.forEach((pos, idx) => {
      const majority = numberOfPositioningByType.length
        ? numberOfPositioningByType.sort((a, b) => a.value > b.value ? -1 : 1)[0]
        : null

      if (majority && majority.label === pos.position.label) {
        pos.toConverge = true
      } else {
        pos.toConverge = false
      }
      vue.$firestore.collection('positions').doc(pos.id).set(pos)

      const index = numberOfPositioningByType.length
        ? numberOfPositioningByType.findIndex(e => e.label === pos.position.label)
        : -1

      if (index !== -1) {
        numberOfPositioningByType[index].value += 1
      } else {
        numberOfPositioningByType.push({ label: pos.position.label, value: 1 })
      }
    })

    req.ascendents
      .filter(asc => asc.correlationAssociation && !asc.deleted)
      .forEach(asc => {
        const numberOfPositioningByType = []
        positionsOfAReq
          .filter(pos =>
            pos.type === 'Correlação' &&
            pos.associatedCorrelation &&
            pos.associatedCorrelation.value === asc.req.value
          )
          .forEach((pos, idx) => {
            const majority = numberOfPositioningByType.length
              ? numberOfPositioningByType.sort((a, b) => a.value > b.value ? -1 : 1)[0]
              : null

            if (majority && majority.label === pos.position.label) {
              pos.toConverge = true
            } else {
              pos.toConverge = false
            }
            vue.$firestore.collection('positions').doc(pos.id).set(pos)

            const index = numberOfPositioningByType.length
              ? numberOfPositioningByType.findIndex(e => e.label === pos.position.label)
              : -1

            if (index !== -1) {
              numberOfPositioningByType[index].value += 1
            } else {
              numberOfPositioningByType.push({ label: pos.position.label, value: 1 })
            }
          })
      })
  })
}

export function justUpdatePosition ({ state, commit }) {
  commit('SET_CUR_POSITION', state.curPositionCp)
  commit('UPDATE_POSITION')
  commit('SET_CLASSIFICATION_FLAG', 'list')
  return vue.$firestore.collection('positions').doc(state.curPositionCp.id).set(state.curPositionCp)
}

export function setCurPositionFromCurUserPosition ({ state, dispatch, rootState, commit }) {
  const currentUserPosition = state.positions.find(e => {
    return e.construction.value === rootState.project.selected.value &&
    e.req.value === rootState.req.selected.id &&
    e.participant.id === rootState.auth.basicUser.id &&
    e.changed === false
  })

  if (currentUserPosition) {
    commit('SET_CUR_POSITION', currentUserPosition)
    commit('SET_CUR_POSITION_CP', currentUserPosition)
    commit('SET_POSITION_FLAG', 'update')
    // commit('SET_FD_CUR_POS_CHANGED', true)
    // commit('UPDATE_POSITION', currentUserPosition)
    // commit('SET_POSITION_FLAG', 'list')

    // vue.$firestore.collection('positions').doc(state.curPositionCp.id).set(state.curPositionCp)
  }

  // state.curPositionCp.changed = true
}

export function erasePosition ({ state, commit, dispatch }) {
  return vue.$firestore.collection('positions').doc(state.curPosition.id).delete()
    .then(res => {
      commit('ERASE_POSITION')
      // dispatch('req/updateState', null, { root: true })
      dispatch('req/justUpdate', null, { root: true })

      this.$router.push({ name: 'position' })
    })
}

// function valid (item) {
//   if (!item.construction) {
//     Notify.create({ message: `Informe o projeto!`,
//       position: 'bottom-right', type: 'warning',
//       timeout: 3000, closeBtn: 'Fechar'
//     })
//     return false
//   }

//   if (!item.type) {
//     Notify.create({ message: `Informe o tipo!`,
//       position: 'bottom-right', type: 'warning',
//       timeout: 3000, closeBtn: 'Fechar'
//     })
//     return false
//   }

//   if (!item.req) {
//     Notify.create({ message: `Informe o requisito!`,
//       position: 'bottom-right', type: 'warning',
//       timeout: 3000, closeBtn: 'Fechar'
//     })
//     return false
//   }

//   if (!item.position) {
//     Notify.create({ message: `Informe a posição!`,
//       position: 'bottom-right', type: 'warning',
//       timeout: 3000, closeBtn: 'Fechar'
//     })
//     return false
//   }

//   return true
// }

/*
  Goals
*/
// export function newGoal ({ commit }) {
//   commit('SET_ASSOCIATED_GOAL', null)
//   commit('SET_ROLER', '')
//   commit('SET_GOAL_STATE_FLAG', 'new')
// }

// export function addGoal ({ state, dispatch, commit, rootState }) {
//   if (validGoal(state.goal)) {
//     commit('ADD_GOAL', state.goal)
//     commit('SET_GOAL_STATE_FLAG', 'list')
//   }
// }

// export function deleteGoal ({ state, commit }) {
//   state.goalSelected.forEach(goal => {
//     const index = state.copy.goals.findIndex(e => e.id === goal.id)
//     state.copy.goals.splice(index, 1)
//   })
//   commit('SET_GOAL_SELECTED', [])
//   commit('SET_GOAL_STATE_FLAG', 'list')
// }

// function validGoal (item) {
//   // if (!item.name) {
//   //   Notify.create({ message: `Informe o nome!`,
//   //     position: 'bottom-right', type: 'warning',
//   //     timeout: 3000, closeBtn: 'Fechar'
//   //   })
//   //   return false
//   // }

//   // if (!item.description) {
//   //   Notify.create({ message: `Informe a descrição!`,
//   //     position: 'bottom-right', type: 'warning',
//   //     timeout: 3000, closeBtn: 'Fechar'
//   //   })
//   //   return false
//   // }

//   return true
// }

/*
  classifications
*/
export function newClassification ({ commit }) {
  const curClassification = new Classification()
  commit('SET_CUR_CLASSIFICATION', { ...curClassification })
  commit('SET_CLASSIFICATION_FLAG', 'new')
}
export function addClassification ({ state, commit }) {
  if (validClassification(state.curClassification)) {
    // commit('SET_FD_CUR_CLASSIF_ID', uid())
    commit('ADD_CLASSIFICATION', state.curClassification)
    commit('SET_CLASSIFICATION_FLAG', 'list')
  }
}
export function selectClassification ({ commit }, param) {
  commit('SET_CUR_CLASSIFICATION', param)
  commit('SET_CLASSIFICATION_FLAG', 'update')
  // commit('SET_GOAL_STATE_FLAG', 'list')
  commit('SET_CURRENT_FEATURE', 'Edição de classificação', { root: true })
  // if (!param.rota) {
  // this.$router.push({ name: 'positionEdit' })
  // } else {
  //   this.$router.push({ name: param.rota })
  // }
  // if (this.isAdmin) {
  // } else {
  // this.$store.commit('req/SET_STATE_FLAG', 'show')
  // }}
}
function validClassification (item) {
  if (!item.classification) {
    Notify.create({
      message: 'Informe a classificação!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  if (!item.justificationOfClassification) {
    Notify.create({
      message: 'Informe a justificativa da classificação!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  return true
}
