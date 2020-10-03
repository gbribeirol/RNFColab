// state, getters, rootState, rootGetters

export const searchColumns = ({ columns }) => {
  return columns.filter(el => el.search)
}

export const visibleColumns = ({ columns }) => {
  return columns.filter(el => el.visible)
}

export const optionalVisibilityColumns = ({ state }, { visibleColumns }) => {
  return visibleColumns.filter(el => !el.required)
}

export const allDisplayColumns = ({ fieldsForDisplay }, { visibleColumns }) => {
  return visibleColumns
    .filter(el => el.required || (fieldsForDisplay && fieldsForDisplay.indexOf(el.name) > -1))
    .map(el => el.name)
}

export const projectsFiltered = ({ projects, searchTerm }, { searchColumns }) => {
  // let result = projects.map(el => {
  //   return Object.assign(el, { keywordsFormated: el.keywords.join(', ') })
  // })

  // const result = projects.map(e => ({
  //   ...e,
  //   startDateF: e.startDate.substr(8, 2) + '/' + e.startDate.substr(5, 2) + '/' + e.startDate.substr(2, 2),
  //   endDateF: e.endDate.substr(8, 2) + '/' + e.endDate.substr(5, 2) + '/' + e.endDate.substr(2, 2)
  // }))

  if (searchTerm === '') {
    return projects
  }

  const words = searchTerm.split('+')

  return projects.filter(item => {
    return words.every(word => {
      return searchColumns.some(col => {
        return item[col.name].toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })
  })
}

export const nonModerationgUsers = ({ copy }, getters, rootState) => {
  if (copy.moderator) {
    return rootState.user.users
      .filter(user => user.id !== copy.moderator.id)
  } else {
    return rootState.user.users
  }
}

export const nonReqEngineerUsers = ({ copy }, getters, rootState) => {
  if (copy.reqEngineer) {
    return rootState.user.users
      .filter(user => user.id !== copy.reqEngineer.id)
  } else {
    return rootState.user.users
  }
}

export function contentChanged ({ selected, copy }) {
  return JSON.stringify(selected) !== JSON.stringify(copy)
}

export const isModerator = ({ copy }, getters, rootState) => {
  const moderator = copy.participants.find(e => e.id === rootState.auth.basicUser.id && e.roler === 'Moderator')
  return moderator !== undefined
}

export const isEngReq = ({ copy }, getters, rootState) => {
  const engReq = copy.participants.find(e => e.id === rootState.auth.basicUser.id && e.roler === 'Eng.Requisito')
  return engReq !== undefined
}

/*
  paricipants
*/

export function validParticipant ({ correlatedGoal, participant }) {
  return participant !== null
}

/*
  mural
*/
import { date } from 'quasar'
// export function feedListOptions ({ feedList }) {
//   return feedList.map(el => ({ label: el.name, value: el.id }))
//     .sort((a, b) => a.label > b.label ? 1 : -1)
// }

export const muralPostTreated = (state, getters, rootState) => {
  if (state.allPostList.length === 0) return 0

  const postList = state.allPostList
    .map(el => {
      el.creationDateFormated = date.formatDate(el.creationDate.toDate(), 'YYYY-MM-DD')
      el.mission_ = el.mission ? el.mission.id : ''
      return el
    })
    .sort((a, b) => (a.creationDateFormated > b.creationDateFormated ? 1 : -1))
  const postsTreated = []

  postList.forEach(el => {
    const index = postsTreated.findIndex(obj =>
      obj.department === el.owner.department &&
      obj.branch === el.owner.branch &&
      obj.creationDate === el.creationDateFormated &&
      obj.missionId === el.mission_)

    if (index !== -1) {
      postsTreated[index].counter += 1
    } else {
      postsTreated.push({ creationDate: el.creationDateFormated, department: el.owner.department, branch: el.owner.branch, missionId: el.mission_, counter: 1 })
    }
  })

  return postsTreated
}

export const muralGetPostsByDay = (state, getters) => {
  if (getters.muralPostTreated.length === 0) return 0

  const allPostsTreated = getters.muralPostTreated.filter(el => el.missionId === '')
  const postsByDay = []

  allPostsTreated.forEach(el => {
    const index = postsByDay.findIndex(obj =>
      obj.department === el.department &&
      obj.branch === el.branch &&
      obj.creationDate === el.creationDate)

    if (index !== -1) {
      postsByDay[index].counter += 1
    } else {
      postsByDay.push({ creationDate: el.creationDate, department: el.department, branch: el.branch, counter: 1 })
    }
  })

  return postsByDay
}

export const getExecPosts = ({ projects }, getters, rootState) => {
  if (rootState.auth.user && projects) {
    return projects.filter(el => el.owner.id === rootState.auth.user.id)
  }
}
