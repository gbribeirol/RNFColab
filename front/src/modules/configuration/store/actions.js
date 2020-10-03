// import { Notify, uid } from 'quasar'
import Vue from 'vue'
const vue = new Vue()

// dispatch, commit, state, rootState

export function createEvaluationParameters ({ state }) {
  state.evaluationParameters.forEach(e => {
    vue.$firestore.collection('evaluationParameters').doc(e.group).set(e)
  })
}
