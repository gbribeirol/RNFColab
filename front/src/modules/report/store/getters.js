/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// state, getters, rootState, rootGetters
import { date } from 'quasar'
import getLastPositionsOfAType from 'src/modules/position/helpers/getLastPositionsOfAType'
import getFirstPositioningOfAParticipant from 'src/modules/position/helpers/getFirstPositioningOfAParticipant'
import getNumberOfDaysFromFirstPositioning from 'src/modules/position/helpers/getNumberOfDaysFromFirstPositioning'
import getTotalNumberOfFirmsAndBlocks from 'src/modules/position/helpers/getTotalNumberOfFirmsAndBlocks'
import getNumberOfFirmsAndBlocks from 'src/modules/position/helpers/getNumberOfFirmsAndBlocks'

export const scoresOfParticipants = (state, getters, rootState, rootGetters) => {
  const projectStartDate = new Date(rootState.project.selected.startDate)
  const projectEndDate = new Date(rootState.project.selected.endDate)
  const numberOfProjectDays = date.getDateDiff(projectEndDate, projectStartDate, 'days')

  const projectReqsCalcFields = rootGetters['req/projectReqsCalcFields']
  const totalNumberOfReqs = projectReqsCalcFields.length
  const totalNumberOfCorrs = projectReqsCalcFields.reduce((acc, e) => acc + e.numberOfCorrelations, 0)
  const totalNumberOfReqsAndCorrs = totalNumberOfReqs + totalNumberOfCorrs

  const totalNumberOfFirmsAndBlocks = getTotalNumberOfFirmsAndBlocks(projectReqsCalcFields)

  const projectPositions = rootGetters['position/projectPositionsCalcFields']
  const lastPositions_reqs = getLastPositionsOfAType(projectPositions, 'Requisito')
  const lastPositions_corrs = getLastPositionsOfAType(projectPositions, 'Correlação')
  const lastPositions = lastPositions_reqs.concat(lastPositions_corrs)
  const totalNumberOfArgs = projectPositions.filter(pos => pos.argument).length
  const totalNumberOfPositioningToConverge = projectPositions.filter(pos => pos.toConverge).length

  // console.log('projectPositions', projectPositions.filter(pos => pos.classifications.length))
  // console.log('projectPositions.filter(pos => pos.finalClassification === Informativo)', projectPositions.filter(pos => pos.finalClassification === 'Informativo'))

  const totalNumberOfRelevant = projectPositions.filter(pos => pos.finalClassification === 'Relevante').length
  const totalNumberOfInformative = projectPositions.filter(pos => pos.finalClassification === 'Informativo').length

  const participants = []
  // percorre todos os participantes do projeto
  const isAdmin = rootGetters['auth/isAdmin']
  const isVisitor = rootGetters['auth/isVisitor']
  const isModerator = rootGetters['project/isModerator']
  const filteredParticipants = rootState.project.selected.participants
    .filter(par => !'Moderator, Eng.Requisito'.includes(par.roler))
    .filter(par => isAdmin || isModerator || isVisitor || par.id === rootState.auth.user.id)

  filteredParticipants.forEach(participant => {
    const firstPositioning = getFirstPositioningOfAParticipant(projectPositions, participant.id)
    const numberOfDaysFromFirstPositioning = getNumberOfDaysFromFirstPositioning(projectStartDate, firstPositioning, numberOfProjectDays)

    // lastPositions
    //   .filter(pos => pos.participant.id === participant.id)
    //   .forEach(pos1 => {
    //     const thereAreThreeOrMoreTypesOfPositions = lastPositions.filter(pos2 =>
    //       pos1.type === 'Requisito' ? (pos2.req.value === pos1.req.value) : pos2.associatedCorrelation.value === pos1.associatedCorrelation.value
    //     ).length !== 0

    //     console.log(thereAreThreeOrMoreTypesOfPositions)
    //   })

    const participantPositions = projectPositions.filter(pos => pos.participant.id === participant.id)
    const numberOfPositions = participantPositions.length
    const numberOfAbstain = participantPositions.filter(pos => pos.position.label === 'Abster-se').length
    const numberOfArgs = participantPositions.filter(pos => pos.argument).length
    const numberOfFirmsAndBlocks = getNumberOfFirmsAndBlocks(projectReqsCalcFields, participant.id)
    const numberOfPositioningToConverge = projectPositions.filter(pos => pos.participant.id === participant.id && pos.toConverge).length

    const numberOfRelevant = participantPositions.filter(pos => pos.finalClassification === 'Relevante').length
    const numberOfInformative = participantPositions.filter(pos => pos.finalClassification === 'Informativo').length

    // let informationalAccountant = 0
    // let relevantAccountant = 0
    // projectPositions
    //   .filter(pos => pos.classifications && pos.participant.id === participant.id)
    //   .forEach(pos => {
    //     informationalAccountant += pos.classifications.filter(c => c.classification.label === 'Informativo').length
    //     relevantAccountant += pos.classifications.filter(c => c.classification.label === 'Relevante').length
    //   })

    const argumentPunctuation = parseFloat(((numberOfRelevant / (totalNumberOfRelevant || 1)) * 5 + (numberOfInformative / (totalNumberOfInformative || 1)) * 3).toFixed(2))

    participants.push({
      participantName: participant.name,
      participantEmail: participant.email,
      numberOfDaysFromFirstPositioning,
      numberOfPositions,
      totalNumberOfCorrs,
      numberOfAbstain,
      numberOfArgs,
      numberOfFirmsAndBlocks,
      numberOfPositioningToConverge,
      numberOfRelevant,
      numberOfInformative,
      argumentPunctuation
    })
  })

  const participantsWithCalculatedFields = participants.map(e => ({
    ...e,
    percAbstains: parseFloat((e.numberOfAbstain / (e.numberOfPositions || 1) * 100).toFixed(2)),
    percPositions: parseFloat((e.numberOfPositions / (totalNumberOfReqsAndCorrs || 1) * 100).toFixed(2)),
    percArgs: parseFloat((e.numberOfArgs / (totalNumberOfArgs || 1) * 100).toFixed(2)),
    percPunctuality: parseFloat((e.numberOfDaysFromFirstPositioning / (numberOfProjectDays || 1) * 100).toFixed(2)),
    percFirmAndBlock: parseFloat((e.numberOfFirmsAndBlocks / (totalNumberOfFirmsAndBlocks || 1) * 100).toFixed(2)),
    percPositioningToConverge: parseFloat((e.numberOfPositioningToConverge / (totalNumberOfPositioningToConverge || 1) * 100).toFixed(2)),
    percContributionArgs: parseFloat((e.argumentPunctuation / 8 * 100).toFixed(2))
  }))

  return {
    numberOfProjectDays,
    totalNumberOfReqs,
    totalNumberOfCorrs,
    totalNumberOfReqsAndCorrs,
    totalNumberOfArgs,
    totalNumberOfFirmsAndBlocks,
    totalNumberOfPositioningToConverge,
    totalNumberOfRelevant,
    totalNumberOfInformative,
    participants: participantsWithCalculatedFields.map(e => ({
      ...e,
      abstainsRating: e.percAbstains <= 10 ? 'Alta' : e.percAbstains <= 50 ? 'Média' : 'Baixa',
      positionsRating: e.percPositions <= 50 ? 'Baixa' : e.percPositions <= 90 ? 'Média' : 'Alta',
      argsRating: e.percArgs <= 10 ? 'Baixa' : e.percArgs <= 20 ? 'Média' : 'Alta',
      punctualityRating: e.percPunctuality <= 20 ? 'Alta' : e.percPunctuality <= 50 ? 'Média' : 'Baixa',
      positioningToConvergeRating: e.percPositioningToConverge <= 20 ? 'Baixa' : e.percPositioningToConverge <= 50 ? 'Média' : 'Alta',
      firmAndBlockRating: e.percFirmAndBlock <= 0 ? 'Alta' : e.percFirmAndBlock <= 50 ? 'Média' : 'Baixa',
      contributionArgsRating: e.percContributionArgs <= 20 ? 'Baixa' : e.percFirmAndBlock <= 50 ? 'Média' : 'Alta'
    }))
  }
}

// export const visibleColumns = ({ reports, searchTerm, columns }) => {
//   return columns.filter(el => el.visible)
// }

// export const optionalVisibilityColumns = ({ state }, { visibleColumns }) => {
//   return visibleColumns // .filter(el => !el.required)
// }

// export const allDisplayColumns = ({ fieldsForDisplay }, { visibleColumns }) => {
//   return visibleColumns
//   // .filter(el => el.required || (fieldsForDisplay && fieldsForDisplay.indexOf(el.name) > -1))
//   // .map(el => el.name)
// }

// export const filteredReqs = ({ reports, searchTerm }, { searchColumns }, { app }, rootGetters) => {
//   const projectReqsCalcFields = rootGetters['req/reqsFiltered'].sort((a, b) => a.name > b.name ? 1 : -1)
//   if (searchTerm === '') {
//     return projectReqsCalcFields
//   }

//   const words = searchTerm.split('+')

//   const filtered = projectReqsCalcFields.filter(e => {
//     return words.every(word => {
//       return searchColumns.some(col => {
//         // return e[col.name].toString().toLowerCase().indexOf(word.toLowerCase()) > -1
//         // eslint-disable-next-line no-eval
//         const dado = eval(('e["' + col.name + '"]').replace('.', '"]["'))
//         return dado.toLowerCase().indexOf(word.toLowerCase()) > -1
//       })
//     })
//   })

//   return filtered
// }

// // export const positionsOfAReq = ({ reports, searchTerm }, { searchColumns }, rootState) => {
// //   let result

// //   if (rootState.project.selected) {
// //     result = reports.filter(e => e.project.value === rootState.project.selected.value && e.changed === false)
// //   } else {
// //     result = []
// //   }

// //   if (rootState.req.selected) {
// //     return result.filter(e => e.req.value === rootState.req.selected.id)
// //   } else {
// //     return []
// //   }
// // }

// // export const nonModerationgUsers = ({ copy }, getters, rootState) => {
// //   if (copy.moderator) {
// //     return rootState.user.users
// //       .filter(user => user.id !== copy.moderator.id)
// //   } else {
// //     return rootState.user.users
// //   }
// // }

// // export const nonReqEngineerUsers = ({ copy }, getters, rootState) => {
// //   if (copy.reqEngineer) {
// //     return rootState.user.users
// //       .filter(user => user.id !== copy.reqEngineer.id)
// //   } else {
// //     return rootState.user.users
// //   }
// // }

// export function contentChanged ({ selected, copy }) {
//   return JSON.stringify(selected) !== JSON.stringify(copy)
// }

// export function validReport ({ copy }) {
//   return copy.project && copy.req && copy.type && copy.report
// }

// export function canErase ({ selected, stateFlag }, getters, rootState, rootGetters) {
//   if (!selected.participant) {
//     return false
//   }
//   return (rootGetters['auth/isAdmin'] || selected.participant.id === rootState.auth.basicUser.id) && stateFlag === 'update'
// }

// export function reqReportedByCurrentUser (state, getters, rootState) {
//   if (!rootState.auth.basicUser) return false
//   if (!rootState.project.selected) return false
//   if (!rootState.req.selected) return false

//   const result = rootState.report.reports.filter(e => {
//     return e.project.value === rootState.project.selected.id &&
//     e.req.value === rootState.req.selected.id &&
//     e.participant.id === rootState.auth.basicUser.id &&
//     e.changed === false
//   })

//   return (result.length > 0)
// }

// /*
//   goal
// */

// export function validGoal ({ correlatedGoal, goal }) {
//   return goal !== null
// }

// /*
//   classifications
// */

// export const classifListIsReadOnly = ({ copy }, getters, rootState, rootGetters) => {
//   if (!copy.participant) return true
//   if (!rootState.auth.basicUser) return true

//   return !rootGetters['auth/isAdmin'] && copy.participant.id === rootState.auth.basicUser.id
// }

// export const undeletedClassifications = ({ copy }) => {
//   if (!copy.classifications) return []

//   return copy.classifications.filter(e => e.deleted === undefined)
// }
// export function validClassification ({ classification }) {
//   return classification.classification && classification.justificationOfClassification
// }

// export function isThereClassifForCurrentUser (state, getters, rootState) {
//   if (!rootState.auth.basicUser) return false
//   if (!rootState.project.selected) return false
//   if (!rootState.req.selected) return false

//   const possitions = rootState.report.reports.filter(e => {
//     return e.project.value === rootState.project.selected.id &&
//     e.req.value === rootState.req.selected.id &&
//     e.changed === false &&
//     e.classifications.some(classif => classif.participant.id === rootState.auth.basicUser.id)
//   })

//   return (possitions.length > 0)
// }
