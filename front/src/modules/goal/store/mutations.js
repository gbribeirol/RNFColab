// import { extend } from 'quasar'
// import { copy } from 'src/helpers/object'
import Vue from 'vue'

const vue = new Vue()

export const SET_LOADING = (state, param) => {
  state.loading = param
}

export const SET_LIST = (state, param) => {
  state.goals = param
}

export const ADD_LIST = (state, item) => {
  state.goals.push(item)
}

export const SET_SELECTED = (state, item) => {
  state.selected = item
  state.copy = JSON.parse(JSON.stringify(item))
  // extend(true, state.copy, item)
  // state.copy = copy(item)
}

export function SET_STATE_FLAG (state, param) {
  state.stateFlag = param
}

export function SET_SEARCH_TERM (state, param) {
  state.searchTerm = param
}

export const UPDATE_LIST_ITEM = (state, param) => {
  const index = state.goals.findIndex(el => el.id === param.id)
  vue.$set(state.goals, index, param)
}

export const ERASE_ITEM_FROM_LIST = (state) => {
  const index = state.goals.findIndex(el => el.id === state.selected.id)
  state.goals.splice(index, 1)
}

export const SET_COPY = (state, item) => {
  state.copy = { ...item }
}
export function SET_ID (state, param) {
  state.copy.id = param
}
export function SET_NAME (state, param) {
  state.copy.name = param
}
export function SET_DESCRIPTION (state, param) {
  state.copy.description = param
}
export function SET_UP_GOAL (state, param) {
  state.copy.upGoal = param
}

export function SET_KEYWORDS (state, param) { state.copy.keywords = param }
export function SET_SOURCE_TYPE (state, param) { state.copy.sourceType = param }
export function SET_MEDIA_TYPE (state, param) { state.copy.mediaType = param }
export function SET_FILE (state, param) { state.copy.file = param }
export function SET_LINK (state, param) { state.copy.link = param }
export function SET_CREATION_DATE (state, param) { state.copy.creationDate = param }

export function SET_FIELDS_FOR_DISPLAY (state, param) {
  state.fieldsForDisplay = param
}

/*
  correlations
*/
export function SET_CORRELATED (state, param) {
  state.correlated = param
}
export function SET_CORRELATION (state, param) {
  state.correlation = param
}

/*
  ascending correlations
*/
export const ADD_ASC_CORRELATION = (state, param) => {
  state.copy.ascCorrelations.push(param)
}
export const DELETE_ASC_CORRELATION = (state, param) => {
  const index = state.copy.ascCorrelations.findIndex(e => e.meta.value === param.meta.value)
  vue.$set(state.copy.ascCorrelations, index, { ...state.copy.ascCorrelations[index], deleted: true })
}
export function SET_ASC_CORRELATION_STATE_FLAG (state, param) {
  state.ascCorrelationSelected = []
  state.ascCorrelationStateFlag = param
}
export function SET_ASC_CORRELATION_SELECTED (state, param) {
  state.ascCorrelationSelected = param
}

/*
  descending correlations
*/
export const ADD_DES_CORRELATION = (state, param) => {
  state.copy.desCorrelations.push(param)
}
export const DELETE_DES_CORRELATION = (state, param) => {
  const index = state.copy.desCorrelations.findIndex(e => e.meta.value === param.meta.value)
  vue.$set(state.copy.desCorrelations, index, { ...state.copy.desCorrelations[index], deleted: true })
}
export function SET_DES_CORRELATION_STATE_FLAG (state, param) {
  state.desCorrelationSelected = []
  state.desCorrelationStateFlag = param
}
export function SET_DES_CORRELATION_SELECTED (state, param) {
  state.desCorrelationSelected = param
}
