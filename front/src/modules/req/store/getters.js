/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// state, getters, rootState, rootGetters

import getLastPositionsOfAType from 'src/modules/position/helpers/getLastPositionsOfAType'
import getNumberOfPositionByType_reqs from 'src/modules/position/helpers/getNumberOfPositionByType_reqs'
import getNumberOfPositionByType_corr from 'src/modules/position/helpers/getNumberOfPositionByType_corr'

export const searchColumns = ({ columns }) => {
  return columns.filter(el => el.search)
}

export const visibleColumns = ({ columns }) => {
  return columns.filter(el => el.visible)
}

export const optionalVisibilityColumns = ({ state }, { visibleColumns }) => {
  return visibleColumns // .filter(el => !el.required)
}

export const allDisplayColumns = ({ fieldsForDisplay }, { visibleColumns }) => {
  return visibleColumns
  // .filter(el => el.required || (fieldsForDisplay && fieldsForDisplay.indexOf(el.name) > -1))
  // .map(el => el.name)
}

// export const reqsFiltered = ({ reqs, reqSearchTerm }, { searchColumns }) => {
//   if (reqSearchTerm === '') {
//     return reqs
//   }
//   console.log('searchColumns', searchColumns)
//   return reqs.filter(row => {validAssociation
//     console.log('row', row)
//     return Object.keys(row).some(key => {
//       console.log('key', key)
//       if (key === 'project') {
//         console.log('sfd')
//       }
//       return String(row[key]).toLowerCase().indexOf(reqSearchTerm.toLowerCase()) > -1
//     })
//   })
// }

//   return reqs.filter(item => {
//     return words.every(word => {
//       return searchColumns.some(col => {
//         return item.name.toLowerCase().indexOf(word.toLowerCase()) > -1
//       })
//     })
//   })

// state, getters, rootState, rootGetters

export const projectReqs = ({ reqs }, getters, rootState) => {
  let result

  if (rootState.project.selected) {
    result = reqs.filter(req => req.construction.value === rootState.project.selected.id)
  } else {
    result = []
  }

  return result
}

export const projectReqsCalcFields = (state, { projectReqs }, { auth }, rootGetters) => {
  const projectPositions = rootGetters['position/projectPositions']
  const lastPositions_reqs = getLastPositionsOfAType(projectPositions, 'Requisito')
  const lastPositions_corrs = getLastPositionsOfAType(projectPositions, 'Correlação')

  return projectReqs.map(req => {
    req.numberOfCorrelations = req.ascendents ? req.ascendents.filter(asc => asc.correlationAssociation && !asc.deleted).length : 0
    req.numberOfRefinements = req.descendents ? req.descendents.filter(des => des.refinementAssociation && !des.deleted).length : 0

    req.curUserHasPosition = projectPositions.filter(pos =>
      pos.req.value === req.id &&
      pos.participant.id === auth.user.id
    ).length !== 0

    // Object.assign(el, { keywordsFormated: el.keywords.join(', ') })
    req.creationDateF = req.creationDate.substr(8, 2) + '/' + req.creationDate.substr(5, 2) + ' ' + req.creationDate.substr(11, 5)

    /*
       posições de requisitos
    */
    const lastPositionsOfAReq_reqs = lastPositions_reqs.filter(pos => pos.req.value === req.id)

    req.numberOfPositionsByType_reqs = getNumberOfPositionByType_reqs(lastPositionsOfAReq_reqs)
    const positionTypes = req.numberOfPositionsByType_reqs.filter(type => type.value > 0)
    if (positionTypes.length === 2 && positionTypes[0].value !== positionTypes[1].value &&
      (positionTypes[0].value === 1 || positionTypes[1].value === 1)) {
      const firmsOrBlocksPosition = positionTypes[0].value === 1
        ? positionTypes[0].name
        : positionTypes[1].name

      req.whoIsFirmsOrBlocks = lastPositionsOfAReq_reqs.filter(pos => pos.position.label === firmsOrBlocksPosition)[0].participant
    } else {
      req.whoIsFirmsOrBlocks = null
    }

    /*
       posições de correlações
    */
    const lastPositionsOfAReq_corrs = lastPositions_corrs.filter(pos => {
      if (req.name === 'Adaptável a sistemas operacionais.') {
        // console.log('req.id', req.id)
        // console.log('lastPositions_corrs', lastPositions_corrs)
        // console.log('lastPositionsOfAReq_corrs', lastPositionsOfAReq_corrs)
        console.log(pos.req.value + ' === ' + req.id, pos)
      }
      // if (pos.req.value === '96febc5e-9725-bcac-19d7-b7955b35f8f6') {
      //   console.log('pos', pos)
      // }
      return pos.req.value === req.id
    })

    if (req.name === 'Adaptável a sistemas operacionais.') {
      console.log('req.id', req.id)
      console.log('lastPositions_corrs', lastPositions_corrs)
      console.log('lastPositionsOfAReq_corrs', lastPositionsOfAReq_corrs)
    }

    req.ascendents
      .filter(asc => asc.correlationAssociation && !asc.deleted)
      .forEach(asc => {
        const correlationPositions = lastPositionsOfAReq_corrs.filter(pos =>
          pos.associatedCorrelation.value === asc.req.value
        )
        asc.numberOfPositionsByType_corrs = getNumberOfPositionByType_corr(correlationPositions)
        const positionTypes = asc.numberOfPositionsByType_corrs.filter(type => type.value > 0)
        if (positionTypes.length === 2 && positionTypes[0].value !== positionTypes[1].value &&
          (positionTypes[0].value === 1 || positionTypes[1].value === 1)) {
          const firmsOrBlocksPosition = positionTypes[0].value === 1
            ? positionTypes[0].name
            : positionTypes[1].name

          asc.whoIsFirmsOrBlocks = correlationPositions.filter(pos => pos.position.label === firmsOrBlocksPosition)[0].participant
        } else {
          asc.whoIsFirmsOrBlocks = null
        }
      })

    return req
  })
}

export const reqsFiltered = ({ reqSearchTerm }, { projectReqsCalcFields }, { position, auth }) => {
  if (reqSearchTerm === '') {
    return projectReqsCalcFields.sort((a, b) => a.name > b.name ? 1 : -1)
  }

  const words = reqSearchTerm.split('+')

  const result = projectReqsCalcFields.filter(e => {
    return words.every(word => {
      return searchColumns.some(col => {
        return e[col.name].toString().toLowerCase().indexOf(word.toLowerCase()) > -1
        // eslint-disable-next-line no-eval
        // let dado = eval(('e["' + col.name + '"]').replace('.', '"]["'))
        // return dado.toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })
  })

  return result.sort((a, b) => a.name > b.name ? 1 : -1)
}

export const summary = (state, { reqsFiltered }) => {
  return ({
    numberOfGoals: reqsFiltered.reduce((sum, e) => sum + e.goals.length, 0),
    numberOfCorrelations: reqsFiltered.reduce((sum, e) => sum + e.numberOfCorrelations, 0),
    numberOfRefinements: reqsFiltered.reduce((sum, e) => sum + e.numberOfRefinements, 0)
  })
}

export const interdependencies = (state, { reqsFiltered }) => {
  return reqsFiltered.map(e => ({
    name: e.name,
    catalogs: e.goals.map(g => g.goal.label + (g.correlation ? '(' + g.correlation.label.replace('Fortalece', '+').replace('Afeta', '?').replace('Enfraquece', '-') + ')' : '')).join('<br>'),
    correlations: e.ascendents.filter(asc => asc.correlationAssociation && !asc.deleted).map(a => a.req.label + (a.finalPosition ? '(' + a.finalPosition.replace('Fortalece', '+').replace('Afeta', '?').replace('Enfraquece', '-') + ')' : '')).join('<br>'),
    refinements: e.descendents.filter(des => des.refinementAssociation && !des.deleted).map(d => d.req.label + (d.refinementAssociation ? '(' + d.refinementAssociation.label + ')' : '')).join('<br>')
  }))
}

// export const nonModerationgUsers = ({ copy }, getters, rootState) => {
//   if (copy.moderator) {
//     return rootState.user.users
//       .filter(user => user.id !== copy.moderator.id)
//   } else {
//     return rootState.user.users
//   }
// }

// export const nonReqEngineerUsers = ({ copy }, getters, rootState) => {
//   if (copy.reqEngineer) {
//     return rootState.user.users
//       .filter(user => user.id !== copy.reqEngineer.id)
//   } else {
//     return rootState.user.users
//   }
// }

export function contentChanged({ selected, copy }) {
  return JSON.stringify(selected) !== JSON.stringify(copy)
}

// export function validAssociation ({ associated, correlationAssociation, refinementAssociation }) {
//   return associated && (correlationAssociation || refinementAssociation)
// }

export function currentUserIsCreatorOfReq(state, getters, rootState) {
  if (!rootState.req.selected) return false
  if (!rootState.req.selected.engineerCreator) return false
  if (!rootState.auth.basicUser) return false

  return rootState.req.selected.engineerCreator.id === rootState.auth.basicUser.id
}

/*
  goal
*/
export function validAssociationGoal({ currentGoal }) {
  return currentGoal && currentGoal.goal && currentGoal.correlation
}

/*
  ascendent
*/
export const undeletedAsc = ({ copy }) => {
  if (!copy.ascendents) return []

  return copy.ascendents.filter(e => e.deleted === undefined && e.correlationAssociation)
}
// unassociated
export const ascUnassociated = ({ reqs, copy }, getters, { project }) => {
  let result = reqs
    .filter(req => req.construction.value === project.selected.id)
    .filter(req => req.id !== copy.id)

  if (copy.ascendents) {
    result = result.filter(req => !copy.ascendents.some(e => e.req.value === req.id && e.correlationAssociation))
  }
  return result
}

/*
  descendent
*/
export const undeletedDes = ({ copy }) => {
  if (!copy.descendents) return []

  return copy.descendents.filter(e => {
    return e.refinementAssociation && !e.deleted
  })
}
export const desUnassociated = ({ reqs, copy }, getters, { project }) => {
  let result = reqs
    .filter(req => req.construction.value === project.selected.id)
    .filter(req => req.id !== copy.id)

  if (copy.descendents) {
    result = result.filter(req => !copy.descendents.some(e => e.req.value === req.id && e.refinementAssociation))
  }
  return result
}
