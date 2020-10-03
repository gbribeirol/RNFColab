// import { extend } from 'quasar'
// import { copy } from 'src/helpers/object'
import Vue from 'vue'

const vue = new Vue()

export const SET_LOADING = (state, param) => {
  state.loading = param
}

export const SET_LIST = (state, param) => {
  state.projects = param
}

export const ADD_LIST = (state, item) => {
  state.projects.push(item)
}

export const SET_SELECTED = (state, item) => {
  item.startDateF = item.startDate.substr(8, 2) + '/' + item.startDate.substr(5, 2) + '/' + item.startDate.substr(2, 2)
  item.endDateF = item.endDate.substr(8, 2) + '/' + item.endDate.substr(5, 2) + '/' + item.endDate.substr(2, 2)
  state.selected = item
  state.copy = JSON.parse(JSON.stringify(item))
  // extend(true, state.copy, item)
  // state.copy = copy(item)
}

export function SET_FLAG (state, param) {
  state.flag = param
}

export function SET_SEARCH_TERM (state, param) {
  state.searchTerm = param
}

export const UPDATE_LIST_ITEM = (state) => {
  const index = state.projects.findIndex(el => el.id === state.copy.id)
  vue.$set(state.projects, index, state.copy)
}

export const ERASE_ITEM_FROM_LIST = (state) => {
  const index = state.projects.findIndex(el => el.id === state.selected.id)
  state.projects.splice(index, 1)
}

export const SET_COPY = (state, item) => {
  state.copy = { ...item }
}

/*
  fields
*/
export function SET_FD_ID (state, param) {
  state.copy.id = param
}
export function SET_FD_NAME (state, param) {
  state.copy.name = param
}
export function SET_FD_DESCRIPTION (state, param) {
  state.copy.description = param
}
export function SET_FD_VERSION (state, param) {
  state.copy.version = param
}
export function SET_FD_START_DATE (state, param) {
  state.copy.startDate = param
}
export function SET_FD_END_DATE (state, param) {
  state.copy.endDate = param
}
// export function SET_MODERATOR (state, param) {
//   state.copy.moderator = param
// }
// export function SET_REQ_ENGINEER (state, param) {
//   state.copy.reqEngineer = param
// }
export function SET_FD_STATE (state, param) {
  state.copy.state = param
}
export function SET_FD_REASON_FOR_CANCELLATION (state, param) {
  state.copy.reasonForCancellation = param
}
export function SET_FD_INITIATED (state, param) {
  state.copy.initiated = param
}
export function SET_FD_FINISHED (state, param) {
  state.copy.finished = param
}
export function SET_FD_CREATION_DATE (state, param) {
  state.copy.creationDate = param
}

/*
  participants
*/

export const SET_PARTICIPANT_FLAG = (state, param) => {
  state.participantSelected = []
  state.participantFlag = param
}
export function SET_PARTICIPANT_SELECTED (state, param) {
  state.participantSelected = param
}
export function SET_PARTICIPANT (state, param) {
  state.participant = param
}
export function SET_ROLER (state, param) {
  state.roler = param
}
export const ADD_PARTICIPANT = (state, param) => {
  state.copy.participants.push(param)
}

/*
  mural
*/

import Post from '../models/Post'

export const SET_MURAL_LOADING = (state, param) => {
  state.muralLoading = param
}
export const SET_MURAL_LIST = (state, param) => {
  state.muralList = param
}
export const SET_MURAL_ALL_POST_LIST = (state, param) => {
  state.muralAllPostList = param
}

export const ADD_MURAL_LIST = (state, param) => {
  state.muralList.unshift(param)
  // vue.$set(state.projects, state.projects.length, item)
}

export const UPDATE_MURAL_LIST_ITEM = (state) => {
  const index = state.muralList.findIndex(el => el.id === state.muralPost.id)
  vue.$set(state.muralList, index, state.muralPost)
}

export const ERASE_MURAL_LIST_ITEM = (state) => {
  const index = state.muralList.findIndex(el => el.id === state.muralSelected.id)
  state.muralList.splice(index, 1)
}

export const SET_MURAL_SELECTED = (state, param) => {
  state.muralSelected = param
  state.muralPost = { ...param }
}

export function NEW_MURAL_POST (state) {
  state.muralPost = new Post()
}
export function SET_MURAL_POST_MESSAGE (state, param) {
  state.muralPost.message = param
}
export function SET_MURAL_MISSION_TRACKER (state, param) {
  state.muralPost.mission = param
}
export function SET_MURAL_COMMENT (state, param) {
  state.muralComment = param
}

export function UPDATE_MURAL_COMMENT (state, param) {
  const index = param.idx
  const content = param.cont
  state.muralPost.comments[index].content = content
}

export function SET_MURAL_FILES (state, param) {
  state.muralPost.files = param
}
