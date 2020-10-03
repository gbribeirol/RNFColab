/* eslint-disable space-before-function-paren */
// state, getters, rootState, rootGetters
import getPositionsOfAReq from 'src/modules/position/helpers/getPositionsOfAReq'
import getNumberOfClassificationsByType from 'src/modules/position/helpers/getNumberOfClassificationsByType'

export const searchColumns = ({ columns }) => {
  return columns.filter(el => el.search)
}

export const visibleColumns = ({ columns }) => {
  return columns.filter(el => el.visible)
}

export const optionalVisibilityColumns = (state, { visibleColumns }) => {
  return visibleColumns // .filter(el => !el.required)
}

export const allDisplayColumns = ({ fieldsForDisplay }, { visibleColumns }) => {
  return visibleColumns
  // .filter(el => el.required || (fieldsForDisplay && fieldsForDisplay.indexOf(el.name) > -1))
  // .map(el => el.name)
}

export const projectPositions = ({ positions, positionSearchTerm }, { searchColumns }, rootState) => {
  if (rootState.project.selected) {
    return positions.filter(e => e.construction.value === rootState.project.selected.id && e.changed === false)
  } else {
    return []
  }
}

export const projectPositionsCalcFields = (state, { projectPositions }, rootState) => {
  return projectPositions.map(pos => {
    pos.curUserHasClassification = pos.classifications.filter(c => c.participant.id === rootState.auth.user.id).length
    if (pos.classifications.length) {
      const numberOfClassificationsByType = getNumberOfClassificationsByType(pos.classifications)
      if (numberOfClassificationsByType[0].value >= numberOfClassificationsByType[1].value) {
        pos.finalClassification = numberOfClassificationsByType[0].label
      } else {
        pos.finalClassification = numberOfClassificationsByType[1].label
      }
    } else {
      pos.finalClassification = null
    }
    pos.creationDateF = pos.creationDate.substr(8, 2) + '/' + pos.creationDate.substr(5, 2) + ' ' + pos.creationDate.substr(11, 5)
    return pos
  })
}

export const positionsFiltered = ({ positionSearchTerm }, { projectPositionsCalcFields, searchColumns }, rootState) => {
  if (positionSearchTerm === '') {
    return projectPositionsCalcFields
  }

  const words = positionSearchTerm.split('+')

  return projectPositionsCalcFields.filter(e => {
    return words.every(word => {
      return searchColumns.some(col => {
        // return e[col.name].toString().toLowerCase().indexOf(word.toLowerCase()) > -1
        // eslint-disable-next-line no-eval
        const dado = eval(('e["' + col.name + '"]').replace('.', '"]["'))
        return dado.toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })
  })
}

export const positionsOfAReq = (state, { projectPositionsCalcFields }, rootState) => {
  if (!rootState.req.selected) {
    return []
  }

  return getPositionsOfAReq(projectPositionsCalcFields, rootState.req.selected.id)
}

// export const nonModerationgUsers = ({ curPositionCp }, getters, rootState) => {
//   if (curPositionCp.moderator) {
//     return rootState.user.users
//       .filter(user => user.id !== curPositionCp.moderator.id)
//   } else {
//     return rootState.user.users
//   }
// }

// export const nonReqEngineerUsers = ({ curPositionCp }, getters, rootState) => {
//   if (curPositionCp.reqEngineer) {
//     return rootState.user.users
//       .filter(user => user.id !== curPositionCp.reqEngineer.id)
//   } else {
//     return rootState.user.users
//   }
// }

export function positionChanged({ curPosition, curPositionCp }) {
  return JSON.stringify(curPosition) !== JSON.stringify(curPositionCp)
}

export function validPosition({ curPositionCp }) {
  return curPositionCp.construction &&
    curPositionCp.req &&
    curPositionCp.type &&
    curPositionCp.position &&
    (curPositionCp.type === 'Correlação' ? curPositionCp.associatedCorrelation : true)
}

export function canErasePosition({ curPosition, positionFlag }, getters, rootState, rootGetters) {
  if (!curPosition.participant) {
    return false
  }
  return (rootGetters['auth/isAdmin'] || curPosition.participant.id === rootState.auth.basicUser.id) && positionFlag === 'update'
}

export function reqPositionedByCurrentUser(state, getters, rootState) {
  if (!rootState.auth.basicUser) return false
  if (!rootState.project.selected) return false
  if (!rootState.req.selected) return false

  const result = rootState.position.positions.filter(e => {
    return e.construction.value === rootState.project.selected.id &&
      e.req.value === rootState.req.selected.id &&
      e.participant.id === rootState.auth.basicUser.id &&
      e.changed === false
  })

  return (result.length > 0)
}

export function correlationPositionTypes(state, getters, rootState) {
  return rootState.app.correlationTypes.concat([{ label: 'Abster-se', value: 4 }])
}

/*
  goal
*/
export function validGoal({ correlatedGoal, goal }) {
  return goal !== null
}

/*
  classifications
*/
export const classifListIsReadOnly = ({ curPositionCp }, getters, rootState, rootGetters) => {
  if (!curPositionCp.participant) return true
  if (!rootState.auth.basicUser) return true

  return !rootGetters['auth/isAdmin'] && curPositionCp.participant.id === rootState.auth.basicUser.id
}
export const undeletedClassifications = ({ curPositionCp }) => {
  if (!curPositionCp.classifications) return []

  return curPositionCp.classifications.filter(e => e.deleted === undefined)
}
export function validClassification({ curClassification }) {
  return curClassification.classification && curClassification.justificationOfClassification
}
export function isThereClassifForCurrentUser(state, getters, rootState) {
  if (!rootState.auth.basicUser) return false
  if (!rootState.project.selected) return false
  if (!rootState.req.selected) return false

  const possitions = rootState.position.positions.filter(e => {
    return e.construction.value === rootState.project.selected.id &&
      e.req.value === rootState.req.selected.id &&
      e.changed === false &&
      e.classifications.some(classif => classif.participant.id === rootState.auth.basicUser.id && !classif.deleted)
  })

  return (possitions.length > 0)
}
