// import router from '@/router'

import Vue from 'vue'
const vue = new Vue()
import { firestoreAction } from 'vuexfire'

export function initApp ({ dispatch, commit, state, rootState }) {
  console.log('----- initApp -----')
  return Promise.all([
    dispatch('bindAppInfo'),
    dispatch('user/load'),
    dispatch('goal/loadGoals', null, { root: true }),
    dispatch('project/loadProjects'),
    dispatch('req/loadReqs'),
    dispatch('position/loadPositions')
  ]).then(r => {
    dispatch('project/updateFinishedProjects')
  })
}

export const setFeatureName = ({ commit }, parameter) => {
  commit('SET_CURRENT_FEATURE', parameter)
}

export const setCurrentRoute = ({ commit, state }, parameter) => {
  commit('PREVIOUS_ROUTER', state.app.currentRoute)
  commit('CURRENT_ROUTER', parameter)
}

export const bindAppInfo = firestoreAction(context => {
  return context.bindFirestoreRef('app.firestore', vue.$firestore.collection('app'))
})
