// import Project from 'src/modules/project/models/Project'
import { Notify, uid } from 'quasar'
import Vue from 'vue'
import Req from '../models/Req'
import AssociationGoal from '../models/AssociationGoal'
import Association from '../models/Association'

const vue = new Vue()

export function initReq ({ dispatch, commit, state, rootState }) {
  if (!rootState.goal.goals.length) {
    dispatch('goal/loadGoals', null, { root: true })
  }
  if (!rootState.project.projects.length) {
    dispatch('project/loadProjects', null, { root: true })
  }
  // if (!state.reqs.length) {
  dispatch('loadReqs')
  // }

  commit('SET_REQ_STATE_FLAG', 'list')
}

export function loadReqs ({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    commit('SET_LOADING', true)
    vue.$firestore.collection('requirements').get()
      .then(snapshot => {
        const array = []
        snapshot.forEach(doc => array.push(doc.data()))
        commit('SET_LIST', array)

        // copia coleção requirements
        // ====================================================================
        // array.forEach(req => {
        //   vue.$firestore.collection('requirements2').doc(req.id).set(req)
        // })

        // recalcula estados dos requisitos, dos projetos fechados
        // ====================================================================
        // const rnfColab = new Project({ id: 'a876e9a1-e111-c26b-3480-a39f4bff66b9', name: 'RNF Colab' })
        // dispatch('req/updateFinalPositionOfAProject ', rnfColab, { root: true })
        // const cesta = new Project({ id: 'c22a1eb9-afc6-881d-bf4d-906290469da7', name: 'Cesta de Medicamentos' })
        // dispatch('req/updateFinalPositionOfAProject ', cesta, { root: true })

        // cria os campos:
        // refinement -> refinementAssociation
        // correlation -> correlationAssociation
        // ====================================================================
        // array.forEach(req => {
        //   req.ascendents.forEach(e => {
        //     if (!e.refinementAssociation && e.refinement) {
        //       e.refinementAssociation = e.refinement
        //     }
        //     if (!e.correlationAssociation && e.correlation) {
        //       e.correlationAssociation = e.correlation
        //     }
        //   })
        //   req.descendents.forEach(e => {
        //     if (!e.refinementAssociation && e.refinement) {
        //       e.refinementAssociation = e.refinement
        //     }
        //     if (!e.correlationAssociation && e.correlation) {
        //       e.correlationAssociation = e.correlation
        //     }
        //   })
        //   vue.$firestore.collection('requirements').doc(req.id).set(req)
        // })

        // cria os campos justificationOfCorrelation, justificationOfRefinement
        // ====================================================================
        // array.forEach(req => {
        //   req.ascendents.forEach(e => {
        //     if (!e.justificationOfCorrelation) {
        //       e.justificationOfCorrelation = ''
        //       e.justificationOfRefinement = ''
        //     }
        //   })
        //   vue.$firestore.collection('requirements').doc(req.id).set(req)
        // })
        // array.forEach(req => {
        //   req.descendents.forEach(e => {
        //     if (!e.justificationOfCorrelation) {
        //       e.justificationOfCorrelation = ''
        //       e.justificationOfRefinement = ''
        //     }
        //   })
        //   vue.$firestore.collection('requirements').doc(req.id).set(req)
        // })

        // cria os campo ascendents
        // ======================================================================
        // array.forEach(req => {
        //   if (!req.ascendents) {
        //     req.ascendents = []
        //     vue.$firestore.collection('requirements').doc(req.id).set(req)
        //   }
        // })

        // cria os campo descendents
        // ======================================================================
        // array.forEach(req => {
        //   if (!req.descendents) {
        //     req.descendents = []
        //     vue.$firestore.collection('requirements').doc(req.id).set(req)
        //   }
        // })

        // transforma as metas associadas, em objetos de modelo 'AssociationGoal'
        // ======================================================================
        // array.forEach(req => {
        //   let goalList = []
        //   req.goals.forEach(goal => {
        //     if (!goal.justification) {
        //       let obj = new AssociationGoal()
        //       obj.goal = { label: goal.label, value: goal.value }
        //       goalList.push({ ...obj })
        //     } else {
        //       goalList.push(goal)
        //     }
        //   })
        //   if (goalList.length) {
        //     req.goals = goalList
        //     vue.$firestore.collection('requirements').doc(req.id).set(req)
        //   }
        // })

        return resolve(array)
      })
      .catch(err => {
        return reject(err)
      })
      .finally(commit('SET_LOADING', false))
  })
}

export function newReq ({ commit, rootState }) {
  const req = new Req()
  if (rootState.project.selected) {
    req.construction = { label: rootState.project.selected.name, value: rootState.project.selected.id }
  }
  commit('SET_COPY', req)
  commit('SET_CURRENT_FEATURE', 'Novo requisito', { root: true })
  commit('SET_REQ_STATE_FLAG', 'new')
  this.$router.push({ name: 'reqNew' })
}

export function addReq ({ state, commit }) {
  if (valid(state.copy)) {
    commit('SET_ID', uid())
    commit('SET_CREATION_DATE', vue.$serverDate())

    vue.$firestore.collection('requirements').doc(state.copy.id).set(state.copy).then(res => {
      commit('SET_SELECTED', state.copy)
      commit('ADD_LIST', state.copy)
      commit('SET_REQ_STATE_FLAG', 'update')
      this.$router.push({ name: 'req' })
    })
  }
}

export function selectReq ({ commit, dispatch }, el) {
  commit('SET_SELECTED', el)
  commit('SET_REQ_STATE_FLAG', 'update')
  commit('SET_GOAL_STATE_FLAG', 'list')
  commit('SET_ASC_STATE_FLAG', 'list')
  commit('SET_DES_STATE_FLAG', 'list')
  commit('SET_CURRENT_FEATURE', 'Edição de requisito', { root: true })
  // dispatch('updateGoals')
  this.$router.push({ name: 'req.Edit' })
  // if (this.isAdmin) {
  // } else {
  // this.$store.commit('req/SET_REQ_STATE_FLAG', 'show')
  // }}
}

// export function updateGoals ({ state, dispatch }, el) {
//   let arr = []
//   state.copy.goals.forEach(e => {
//     if (e.justification === undefined) {
//       let currentGoal = new AssociationGoal()
//       currentGoal.goal = { label: e.label, value: e.value }
//       arr.push(currentGoal)
//     }
//   })
//   if (arr.length) {
//     state.copy.goals = arr
//     dispatch('justUpdate')
//   }
// }

export function updateReq ({ state, commit, dispatch }) {
  return new Promise((resolve, reject) => {
    if (valid(state.copy)) {
      // ASCENDENTES
      state.copy.ascendents.forEach((asc, idx) => {
        const req = state.reqs.filter(e => e.id === asc.req.value)[0]

        if (asc.deleted) {
          // apagar req atual (como descendente), na req ascendente
          if (req) {
            const index = req.descendents.findIndex(d => d.req.value === state.copy.id)
            if (index !== -1) {
              req.descendents.splice(index, 1)
              vue.$firestore.collection('requirements').doc(req.id).set(req)
            }
          }

          // apagar ascendente na req atual
          state.copy.ascendents.splice(idx, 1)
        }

        if (asc.added) {
          // inclui req atual (como descendente), na req ascendente
          req.descendents.push({
            req: { label: state.copy.name, value: state.copy.id },
            correlationAssociation: asc.correlationAssociation,
            refinementAssociation: asc.refinementAssociation,
            justificationOfCorrelation: asc.justificationOfCorrelation,
            justificationOfRefinement: asc.justificationOfRefinement
          })
          vue.$firestore.collection('requirements').doc(req.id).set(req)

          // apaga flag added
          delete asc.added
        }
      })

      // DESCENTENTES
      state.copy.descendents.forEach((des, idx) => {
        const req = state.reqs.filter(g => g.id === des.req.value)[0]

        if (des.deleted) {
          // apagar req atual (como ascendente), na req descendente
          if (req) {
            const index = req.ascendents.findIndex(d => d.req.value === state.copy.id)
            if (index !== -1) {
              req.ascendents.splice(index, 1)
              vue.$firestore.collection('requirements').doc(req.id).set(req)
            }
          }

          // apagar descendente na req atual
          state.copy.descendents.splice(idx, 1)
        }

        if (des.added) {
          // inclui req atual (como ascendente), na req descendente
          req.ascendents.push({
            req: { label: state.copy.name, value: state.copy.id },
            correlationAssociation: des.correlationAssociation,
            refinementAssociation: des.refinementAssociation,
            justificationOfCorrelation: des.justificationOfCorrelation,
            justificationOfRefinement: des.justificationOfRefinement
          })
          vue.$firestore.collection('requirements').doc(req.id).set(req)

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
export function justUpdate ({ state, commit, dispatch }) {
  dispatch('updateState')
  commit('SET_GOAL_STATE_FLAG', 'list')
  commit('SET_ASC_STATE_FLAG', 'list')
  commit('SET_DES_STATE_FLAG', 'list')
  commit('SET_SELECTED', state.copy)
  commit('UPDATE_LIST_ITEM')

  return vue.$firestore.collection('requirements').doc(state.copy.id).set(state.copy)
}

export function eraseReq ({ state, commit, dispatch }) {
  return vue.$firestore.collection('requirements').doc(state.selected.id).delete()
    .then(res => {
      commit('ERASE_ITEM_FROM_LIST')
      this.$router.push({ name: 'req' })
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

  if (!item.sentence) {
    Notify.create({
      message: 'Informe a sentença!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  if (!item.construction) {
    Notify.create({
      message: 'Informe o projeto!',
      position: 'bottom-right', type: 'warning',
      timeout: 3000, closeBtn: 'Fechar'
    })
    return false
  }

  return true
}

export async function updateFinalPositionOfAProject ({ state, rootState, dispatch }, project) {
  const reqs = []
  await state.reqs
    .filter(async req => req.construction.value === project.id)
    .forEach(async req => {
      req.finalPosition = ''
      req.originOfPosition = 'AUTOMÁTICA'
      if (!'Criado, Cancelado'.includes(req.state.label)) {
        const positions = rootState.position.positions.filter(pos => pos.req.value === req.id && pos.type === 'Requisito')

        const positions2 = positions.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
          .filter((e, i, a) => a.findIndex(t => (t.participant.id === e.participant.id)) === i)

        const disposable = positions2.filter(pos => pos.position.label === 'Descartável').length
        const desirable = positions2.filter(pos => pos.position.label === 'Desejável').length
        const essential = positions2.filter(pos => pos.position.label === 'Essencial').length
        // const abstention = positions2.filter(pos => pos.position.label === 'Abster-se').length

        if (disposable > desirable && disposable > essential) {
          req.state = 'Descartado'
          req.finalPosition = 'Descartado'
        } else if (desirable > disposable && desirable > essential) {
          req.state = 'Construído'
          req.finalPosition = 'Desejável'
        } else if (essential > disposable && essential > desirable) {
          req.state = 'Construído'
          req.finalPosition = 'Essencial'
        } else {
          req.state = 'Em Negociação'
          req.originOfPosition = ''
        }
      }

      await dispatch('calcFinalPositionOfCorrelations', req)

      // if (req.name === 'Coleta de dados') {
      //   console.log('ascendents', req.ascendents)
      // }
      await vue.$firestore.collection('requirements').doc(req.id).set(req)
    })
  return reqs
}

export async function calcFinalPositionOfCorrelations ({ state, rootState }, req) {
  if ('Criado, Cancelado'.includes(req.state)) {
    return
  }

  // correlações
  await req.ascendents.forEach(async asc => {
    // if (req.name === 'Coleta de dados') {
    //   console.log('rootState.position.positions', rootState.position.positions)
    //   console.log('asc', asc)
    // }
    const corrPositions = rootState.position.positions.filter(pos =>
      pos.req.value === req.id &&
      pos.type === 'Correlação' &&
      pos.associatedCorrelation.value === asc.req.value &&
      pos.position
    )

    // pega somente a ultima posição dos participantes
    const corrPositions2 = await corrPositions.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
      .filter((e, i, a) => a.findIndex(t => (t.participant.id === e.participant.id)) === i)

    const strengthens = corrPositions2.filter(p => p.position.label === 'Fortalece').length
    const weaken = corrPositions2.filter(p => p.position.label === 'Enfraquece').length
    const affect = corrPositions2.filter(p => p.position.label === 'Afeta').length
    const notAffect = corrPositions2.filter(p => p.position.label === 'Não afeta').length
    // const abstain = corrPositions2.filter(p => p.position.label === 'Abster-se').length

    asc.finalPosition = ''
    asc.originOfPosition = 'AUTOMÁTICA'

    if (strengthens > weaken && strengthens > affect && strengthens > notAffect) {
      asc.finalPosition = 'Fortalece'
    } else if (weaken > strengthens && weaken > affect && weaken > notAffect) {
      asc.finalPosition = 'Enfraquece'
    } else if (affect > strengthens && affect > weaken && affect > notAffect) {
      asc.finalPosition = 'Afeta'
    } else if (notAffect > strengthens && notAffect > weaken && notAffect > affect) {
      asc.finalPosition = 'Não afeta'
    } else {
      asc.originOfPosition = ''
    }
  })
  // return req
}

export function updateState ({ state, commit, rootGetters }) {
  const positions = rootGetters['position/positionsOfAReq']
  if (positions.length > 0 && state.copy.state === 'Criado') {
    commit('SET_STATE', { value: 'Em Negociação' })
  } else if (positions.length === 0 && state.copy.state !== 'Criado') {
    commit('SET_STATE', { value: 'Criado' })
  }

  // vue.$firestore
  //   .collection('positions')
  //   .where('construction.value', '==', state.copy.construction.value)
  //   .where('req.value', '==', state.copy.id)
  //   .where('changed', '==', false)
  //   .get().then(snapshot => {
  //     if (snapshot.size > 0 && state.copy.state === 'Criado') {
  //       commit('SET_STATE', { value: 'Em Negociação' })
  //       // dispatch('justUpdate')
  //     } else if (snapshot.size <= 0 && state.copy.state !== 'Criado') {
  //       commit('SET_STATE', { value: 'Criado' })
  //       // dispatch('justUpdate')
  //     }
  //   })
}

/*
  Goals
*/
export function newGoal ({ commit }) {
  commit('SET_CURRENT_GOAL', new AssociationGoal())
  commit('SET_GOAL_STATE_FLAG', 'new')
}

export function addGoal ({ state, commit }) {
  commit('ADD_GOAL', state.currentGoal)
  commit('SET_GOAL_STATE_FLAG', 'list')
}

export function deleteGoal ({ state, commit }) {
  const index = state.copy.goals.findIndex(e => e.goal.id === state.currentGoal.goal)
  state.copy.goals.splice(index, 1)
  commit('SET_CURRENT_GOAL', null)
  commit('SET_GOAL_STATE_FLAG', 'list')
}

/*
  ascendents
*/
export function newAscendent ({ commit }) {
  commit('SET_CURRENT_ASC', new Association())

  // commit('SET_ASSOCIATED', null)
  // commit('SET_FD_CURRENT_ASC_CORRELATION', null)
  // commit('SET_REFINEMENT_ASSOCIATION', null)
  commit('SET_ASC_STATE_FLAG', 'new')
}
export function addAscendent ({ state, commit }) {
  state.currentAsc.added = true
  commit('ADD_ASC', state.currentAsc)
  commit('SET_ASC_STATE_FLAG', 'list')
}
export function deleteAscendent ({ state, commit }) {
  commit('DELETE_ASC', state.currentAsc)
  commit('SET_CURRENT_ASC', null)
  commit('SET_ASC_STATE_FLAG', 'list')
}

/*
  descendents
*/
export function newDescendent ({ commit }) {
  commit('SET_CURRENT_DES', new Association())

  // commit('SET_ASSOCIATED', null)
  // commit('SET_CORRELATION_ASSOCIATION', null)
  // commit('SET_REFINEMENT_ASSOCIATION', null)
  commit('SET_DES_STATE_FLAG', 'new')
}
export function addDescendent ({ state, commit }) {
  state.currentDes.added = true
  commit('ADD_DES', state.currentDes)
  commit('SET_DES_STATE_FLAG', 'list')
}
export function deleteDescendent ({ state, commit }) {
  commit('DELETE_DES', state.currentDes)
  commit('SET_CURRENT_DES', null)
  commit('SET_DES_STATE_FLAG', 'list')
}

/*
  correlations
*/
export function newCorrelation ({ commit }) {
  commit('SET_ASSOCIATED', null)
  commit('SET_REFINEMENT_ASSOCIATION', null)
  // commit('SET_ASSOCIATED', { label: '', value: '' })
  // commit('SET_REFINEMENT_ASSOCIATION', { label: '', value: '' })
  commit('SET_CORRELATION_STATE_FLAG', 'new')
}

export function addCorrelation ({ state, commit }) {
  if (validAssociation(state.copy)) {
    const correlation = {
      metaLabel: state.correlatedGoal.label,
      metaValue: state.correlatedGoal.value,
      correlationLabel: state.correlation.label,
      correlationValue: state.correlation.value
    }
    commit('ADD_CORRELATION', correlation)
    commit('SET_CORRELATION_STATE_FLAG', 'list')
  }
}

export function deleteCorrelation ({ state, commit }) {
  state.correlationSelected.forEach(correlation => {
    const index = state.copy.correlations.findIndex(e => e.metaValue === correlation.metaValue)
    state.copy.correlations.splice(index, 1)
  })
  commit('SET_CORRELATION_SELECTED', [])
  commit('SET_CORRELATION_STATE_FLAG', 'list')
}

function validAssociation (item) {
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
//   commit('SET_REQ_STATE_FLAG', 'new')
//   console.log(state.reqStateFlag)
//   commit('SET_COPY', newContent)
// }

// export function addContent ({ state, commit }) {
//   if (validate(state.copy)) {
//     vue.$firestore.collection('library').doc(state.copy.id).set(state.copy).then(res => {
//       commit('SET_SELECTED', state.copy)
//       commit('ADD_LIST', state.copy)
//       commit('SET_REQ_STATE_FLAG', 'update')
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
//       // commit('SET_REQ_STATE_FLAG', 'update')
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
//           // commit('SET_REQ_STATE_FLAG', 'update')
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
