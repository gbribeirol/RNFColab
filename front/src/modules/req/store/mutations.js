// import { extend } from 'quasar'
// import { copy } from 'src/helpers/object'
import Vue from 'vue'

const vue = new Vue()

export const SET_LOADING = (state, param) => {
  state.loading = param
}

export const SET_LIST = (state, param) => {
  state.reqs = param
}

export const ADD_LIST = (state, item) => {
  state.reqs.push(item)
}

export const SET_SELECTED = (state, item) => {
  item.ascendents.forEach(e => {
    if (e.finalPosition === undefined) {
      e.finalPosition = ''
    }
    if (e.originOfPosition === undefined) {
      e.originOfPosition = ''
    }
  })

  state.selected = item
  state.copy = JSON.parse(JSON.stringify(item))
  // extend(true, state.copy, item)
  // state.copy = copy(item)
}

export function SET_REQ_STATE_FLAG (state, param) {
  state.reqStateFlag = param
}

export function SET_REQ_SEARCH_TERM (state, param) {
  state.reqSearchTerm = param
}

export const UPDATE_LIST_ITEM = (state) => {
  const index = state.reqs.findIndex(el => el.id === state.copy.id)
  vue.$set(state.reqs, index, state.copy)
}

export const ERASE_ITEM_FROM_LIST = (state) => {
  const index = state.reqs.findIndex(el => el.id === state.selected.id)
  state.reqs.splice(index, 1)
}

export const SET_COPY = (state, item) => {
  state.copy = { ...item }
}

/*
  fields
*/
export function SET_ID (state, param) {
  state.copy.id = param
}
export function SET_NAME (state, param) {
  state.copy.name = param
}
export function SET_TYPE (state, param) {
  state.copy.type = param.value
}
export function SET_STATE (state, param) {
  state.copy.state = param.value
}
export function SET_FINAL_POSITION (state, param) {
  state.copy.finalPosition = param.label
  state.copy.originOfPosition = 'MODERADOR'

  if (state.copy.finalPosition === 'Descartado') {
    state.copy.state = 'Descartado'
  } else if ('Desejável, Essencial'.includes(state.copy.finalPosition)) {
    state.copy.state = 'Construído'
  }
}
export function SET_FD_JUSTIFICATION_OF_FINAL_POSITION (state, param) {
  state.copy.justificationOfFinalPosition = param
}
export function SET_SENTENCE (state, param) {
  state.copy.sentence = param
}
export function SET_PROJECT (state, param) {
  state.copy.construction = param
}
// export function SET_UP_REQ (state, param) {
//   state.copy.upReq = param
// }
export function SET_CREATION_DATE (state, param) {
  state.copy.creationDate = param
}

/*
  goals
*/
export function SET_CURRENT_GOAL (state, param) {
  state.currentGoal = param
  state.goalStateFlag = 'update'
}
export function SET_FD_CURRENT_GOAL_GOAL (state, param) {
  state.currentGoal.goal = param
}
export function SET_FD_CURRENT_GOAL_CORRELATION (state, param) {
  state.currentGoal.correlation = param
}
export function SET_FD_CURRENT_GOAL_JUSTIFICATION (state, param) {
  state.currentGoal.justification = param
}
export const SET_GOAL_STATE_FLAG = (state, param) => {
  state.goalStateFlag = param
}
export const ADD_GOAL = (state, param) => {
  state.copy.goals.push(param)
}

/*
  ascendent
*/
export function SET_CURRENT_ASC (state, param) {
  state.currentAsc = param
  state.ascStateFlag = 'update'
}
export function SET_FD_CURRENT_ASC_REQ (state, param) {
  state.currentAsc.req = param
}
export function SET_FD_CURRENT_ASC_CORRELATION (state, param) {
  state.currentAsc.correlationAssociation = param
}
export function SET_FD_CURRENT_ASC_JUSTIFICATION_OF_CORRELATION (state, param) {
  state.currentAsc.justificationOfCorrelation = param
}
export function SET_FD_CURRENT_ASC_FINAL_POSITION (state, param) {
  state.currentAsc.finalPosition = param.label
  state.copy.originOfPosition = 'MODERADOR'
}
export function SET_ASC_STATE_FLAG (state, param) {
  state.ascStateFlag = param
}
export const ADD_ASC = (state, param) => {
  state.copy.ascendents.push(param)
}
export const DELETE_ASC = (state, param) => {
  const index = state.copy.ascendents.findIndex(e => e.req.value === param.req.value)
  vue.$set(state.copy.ascendents, index, { ...state.copy.ascendents[index], deleted: true })
}

/*
  descendent
*/
export function SET_CURRENT_DES (state, param) {
  state.currentDes = param
  state.desStateFlag = 'update'
}
export function SET_FD_CURRENT_DES_REQ (state, param) {
  state.currentDes.req = param
}
export function SET_FD_CURRENT_DES_REFINEMENT (state, param) {
  state.currentDes.refinementAssociation = param
}
export function SET_FD_CURRENT_DES_JUSTIFICATION_OF_REFINEMENT (state, param) {
  state.currentDes.justificationOfRefinement = param
}
export function SET_DES_STATE_FLAG (state, param) {
  // state.currentDes = null
  state.desStateFlag = param
}
export const ADD_DES = (state, param) => {
  state.copy.descendents.push(param)
}
export const DELETE_DES = (state, param) => {
  const index = state.copy.descendents.findIndex(e => e.req.value === param.req.value)
  vue.$set(state.copy.descendents, index, { ...state.copy.descendents[index], deleted: true })
}

/*
  correlations
*/
export const ADD_CORRELATION = (state, param) => {
  state.copy.correlations.push(param)
}
export function SET_CORRELATION_STATE_FLAG (state, param) {
  state.correlationSelected = []
  state.correlationStateFlag = param
}
export function SET_CORRELATION_SELECTED (state, param) {
  state.correlationSelected = param
}
export function SET_REFINEMENT_ASSOCIATION (state, param) {
  state.correlation = param
}

/*
  associate
*/
// export function SET_ASSOCIATED (state, param) {
//   state.associated = param
// }
// export function SET_CORRELATION_ASSOCIATION (state, param) {
//   state.correlationAssociation = param
// }
// export function SET_REFINEMENT_ASSOCIATION (state, param) {
//   state.refinementAssociation = param
// }
