// import { Notify, uid } from 'quasar'
// import Vue from 'vue'
// import Report from '../models/_Report'
// import Classification from '../models/_Classification'
// // import BasicUser from 'src/modules/user/models/BasicUser'
// const vue = new Vue()

// export function newReport ({ commit, rootState }) {
//   const report = new Report()
//   if (rootState.project.selected) {
//     report.project = rootState.project.selected
//   }

//   commit('SET_COPY', report)
//   commit('SET_CURRENT_FEATURE', 'Nova posição', { root: true })
//   this.$router.push({ name: 'reportNew' })
// }

// export function addReport ({ state, commit }) {
//   // if (valid(state.copy)) {
//   // eslint-disable-next-line no-constant-condition
//   if (true) {
//     commit('SET_ID', uid())
//     commit('SET_CREATION_DATE', vue.$serverDate())

//     vue.$firestore.collection('reports').doc(state.copy.id).set(state.copy).then(res => {
//       commit('SET_SELECTED', state.copy)
//       commit('ADD_LIST', state.copy)
//       this.$router.push({ name: 'report' })
//     })
//   }
// }

// export function selectReport ({ commit }, param) {
//   commit('SET_SELECTED', param.el)
//   // commit('SET_GOAL_STATE_FLAG', 'list')
//   commit('SET_CURRENT_FEATURE', 'Edição de posição', { root: true })
//   if (!param.rota) {
//     this.$router.push({ name: 'reportEdit' })
//   // } else {
//   //   this.$router.push({ name: param.rota })
//   }
//   // if (this.isAdmin) {
//   // } else {
//   // this.$store.commit('req/SET_STATE_FLAG', 'show')
//   // }}
// }

// export function updateReport ({ state, commit, dispatch }) {
//   return new Promise((resolve, reject) => {
//     // if (valid(state.copy)) {
//     // eslint-disable-next-line no-constant-condition
//     if (true) {
//       // ASCENDENTES
//       // state.copy.ascendents.forEach((asc, idx) => {
//       //   let req = state.reqs.filter(e => e.id === asc.req.value)[0]

//       //   if (asc.deleted) {
//       //     // apagar req atual (como descendente), na req ascendente
//       //     const index = req.descendents.findIndex(d => d.req.value === state.copy.id)
//       //     if (index !== -1) {
//       //       req.descendents.splice(index, 1)
//       //       vue.$firestore.collection('reports').doc(req.id).set(req)
//       //     }

//       //     // apagar ascendente na req atual
//       //     state.copy.ascendents.splice(idx, 1)
//       //   }

//       //   if (asc.added) {
//       //     // inclui req atual (como descendente), na req ascendente
//       //     req.descendents.push({
//       //       req: { label: state.copy.name, value: state.copy.id },
//       //       associatedCorrelation: asc.associatedCorrelation
//       //     })
//       //     vue.$firestore.collection('reports').doc(req.id).set(req)

//       //     // apaga flag added
//       //     delete asc.added
//       //   }
//       // })

//       // DESCENTENTES
//       // state.copy.descendents.forEach((des, idx) => {
//       //   let req = state.reqs.filter(g => g.id === des.req.value)[0]

//       //   if (des.deleted) {
//       //     // apagar req atual (como ascendente), na req descendente
//       //     const index = req.ascendents.findIndex(d => d.req.value === state.copy.id)
//       //     if (index !== -1) {
//       //       req.ascendents.splice(index, 1)
//       //       vue.$firestore.collection('reports').doc(req.id).set(req)
//       //     }

//       //     // apagar descendente na req atual
//       //     state.copy.descendents.splice(idx, 1)
//       //   }

//       //   if (des.added) {
//       //     // inclui req atual (como ascendente), na req descendente
//       //     req.ascendents.push({
//       //       req: { label: state.copy.name, value: state.copy.id },
//       //       associatedCorrelation: des.associatedCorrelation
//       //     })
//       //     vue.$firestore.collection('reports').doc(req.id).set(req)

//       //     // apaga flag added
//       //     delete des.added
//       //   }
//       // })

//       dispatch('justUpdate').then(res => resolve())
//     } else {
//       reject()
//     }
//   })
// }
// export function justUpdate ({ state, commit }) {
//   commit('SET_SELECTED', state.copy)
//   commit('UPDATE_LIST_ITEM')
//   return vue.$firestore.collection('reports').doc(state.copy.id).set(state.copy)
// }

// export function changeReport ({ state, dispatch, rootState, commit }) {
//   const currentUserReport = state.reports.filter(e => {
//     return e.project.value === rootState.project.selected.value &&
//     e.req.value === rootState.req.selected.id &&
//     e.participant.id === rootState.auth.basicUser.id &&
//     e.changed === false
//   })

//   if (currentUserReport.length > 0) {
//     commit('SET_SELECTED', currentUserReport[0])
//     commit('SET_CHANGED', true)
//     commit('UPDATE_LIST_ITEM', currentUserReport[0])

//     vue.$firestore.collection('reports').doc(state.copy.id).set(state.copy)
//   }

//   // state.copy.changed = true
// }

// export function eraseReport ({ state, commit, dispatch }) {
//   return vue.$firestore.collection('reports').doc(state.selected.id).delete()
//     .then(res => {
//       commit('ERASE_ITEM_FROM_LIST')
//       this.$router.push({ name: 'report' })
//     })
// }

// // function valid (item) {
// //   if (!item.project) {
// //     Notify.create({ message: `Informe o projeto!`,
// //       report: 'bottom-right', type: 'warning',
// //       timeout: 3000, closeBtn: 'Fechar'
// //     })
// //     return false
// //   }

// //   if (!item.type) {
// //     Notify.create({ message: `Informe o tipo!`,
// //       report: 'bottom-right', type: 'warning',
// //       timeout: 3000, closeBtn: 'Fechar'
// //     })
// //     return false
// //   }

// //   if (!item.req) {
// //     Notify.create({ message: `Informe o requisito!`,
// //       report: 'bottom-right', type: 'warning',
// //       timeout: 3000, closeBtn: 'Fechar'
// //     })
// //     return false
// //   }

// //   if (!item.report) {
// //     Notify.create({ message: `Informe a posição!`,
// //       report: 'bottom-right', type: 'warning',
// //       timeout: 3000, closeBtn: 'Fechar'
// //     })
// //     return false
// //   }

// //   return true
// // }

// /*
//   Goals
// */
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
//   //     report: 'bottom-right', type: 'warning',
//   //     timeout: 3000, closeBtn: 'Fechar'
//   //   })
//   //   return false
//   // }

//   // if (!item.description) {
//   //   Notify.create({ message: `Informe a descrição!`,
//   //     report: 'bottom-right', type: 'warning',
//   //     timeout: 3000, closeBtn: 'Fechar'
//   //   })
//   //   return false
//   // }

//   return true
// }

// /*
//   classifications
// */
// export function newClassification ({ commit }) {
//   commit('SET_CLASSIFICATION', new Classification())
//   commit('SET_CLASSIF_STATE_FLAG', 'new')
// }
// export function addClassification ({ state, commit }) {
//   if (validClassification(state.classification)) {
//     commit('SET_FD_CLASSIF_ID', uid())
//     commit('ADD_CLASSIFICATION', { ...state.classification })
//     commit('SET_CLASSIF_STATE_FLAG', 'list')
//   }
// }
// export function deleteClassification ({ state, commit }) {
//   state.selectedClassifications.forEach(el => {
//     commit('DELETE_CLASSIFICATION', el)
//   })
//   commit('SET_SELECTED_CLASSIFICATIONS', [])
//   commit('SET_CLASSIF_STATE_FLAG', 'list')
// }

// function validClassification (item) {
//   if (!item.classification) {
//     Notify.create({
//       message: 'Informe a classificação!',
//       report: 'bottom-right', type: 'warning',
//       timeout: 3000, closeBtn: 'Fechar'
//     })
//     return false
//   }

//   if (!item.justificationOfClassification) {
//     Notify.create({
//       message: 'Informe a justificativa da classificação!',
//       report: 'bottom-right', type: 'warning',
//       timeout: 3000, closeBtn: 'Fechar'
//     })
//     return false
//   }

//   return true
// }
