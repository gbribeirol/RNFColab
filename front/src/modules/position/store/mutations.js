// import { extend } from 'quasar'
// import { copy } from 'src/helpers/object'
import Vue from 'vue'

const vue = new Vue()

export function SET_POSITIONS (state, param) {
  state.positions = param
}

export function SET_CUR_POSITION (state, item) {
  state.curPosition = item
  // extend(true, state.curPositionCp, item)
  // state.curPositionCp = curPositionCp(item)
}
export function SET_CUR_POSITION_CP (state, item) {
  state.curPositionCp = JSON.parse(JSON.stringify(item))
}

export function SET_POSITION_FLAG (state, param) {
  state.positionFlag = param
}

export function SET_POSITION_SEARCH_TERM (state, param) {
  state.positionSearchTerm = param
}

export function SET_ACCESSED_FROM (state, param) {
  state.accessedFrom = param
}

export function ADD_POSITION (state, item) {
  state.positions.push(item)
}

export function UPDATE_POSITION (state) {
  const index = state.positions.findIndex(el => el.id === state.curPosition.id)
  vue.$set(state.positions, index, state.curPositionCp)
}

export function ERASE_POSITION (state) {
  const index = state.positions.findIndex(el => el.id === state.curPosition.id)
  state.positions.splice(index, 1)
}

/*
  fields
*/
export function SET_FD_CUR_POS_TYPE (state, param) {
  state.curPositionCp.type = param.value
}
export function SET_FD_CUR_POS_ASSOCIATED_CORRELATION (state, param) {
  state.curPositionCp.associatedCorrelation = param
}
export function SET_FD_CUR_POS_POSITION (state, param) {
  state.curPositionCp.position = param
}
export function SET_FD_CUR_POS_ARGUMENT (state, param) {
  state.curPositionCp.argument = param
}
export function SET_FD_CUR_POS_CHANGED (state, param) {
  state.curPositionCp.changed = param
}

/*
  classifications
*/
export function SET_CLASSIFICATION_FLAG (state, param) {
  state.classificationFlag = param
}
export function SET_CUR_CLASSIFICATION (state, param) {
  state.curClassification = param
}
export function SET_FD_CUR_CLASSIF_ID (state, param) {
  state.curClassification.id = param
  // param.target.id = param.origin
}
export function SET_FD_CUR_CLASSIF_CLASSIFICATION (state, param) {
  state.curClassification.classification = param
  // param.target.classification = param.origin
}
export function SET_FD_CUR_CLASSIF_JUSTIFICATION (state, param) {
  state.curClassification.justificationOfClassification = param
  // param.target.justificationOfClassification = param.origin
}
export function SET_FD_CUR_CLASSIF_RETURN_OF_JUSTIFICATION (state, param) {
  state.curClassification.returnOfJustification = param
}
export function ADD_CLASSIFICATION (state, param) {
  state.curPositionCp.classifications.push(param)
}
export function DELETE_CLASSIFICATION (state, param) {
  const idx = state.curPositionCp.classifications.findIndex(e => e.id === param.id)
  state.curPositionCp.classifications.splice(idx, 1)
  state.classificationFlag = 'list'
}
