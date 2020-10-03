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

export const goalsFiltered = ({ goals, searchTerm }, { searchColumns }) => {
  // let result = goals.map(el => {
  //   return Object.assign(el, { keywordsFormated: el.keywords.join(', ') })
  // })
  const result = goals.map(e => ({
    ...e,
    ascendants: e.ascCorrelations.map(a => a.meta.label).join(', '),
    descendants: e.desCorrelations.map(a => a.meta.label).join(', ')
  }))

  if (searchTerm === '') {
    return result
  }

  const words = searchTerm.split('+')

  return result.filter(item => {
    return words.every(word => {
      return searchColumns.some(col => {
        return item[col.name].toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })
  })
}

export const goalsWithoutUpGoal = ({ goals, copy }) => {
  return goals
    .filter(goal => goal.id !== copy.id)
}

export function contentChanged ({ selected, copy }) {
  return JSON.stringify(selected) !== JSON.stringify(copy)
}

export function validCorrelation ({ correlated, correlation }) {
  return correlated && correlation
}

/*
  correlations
*/
export const uncorrelated = ({ goals, copy }) => {
  return goals
    .filter(goal => goal.id !== copy.id)
    .filter(goal => !copy.ascCorrelations.some(e => e.meta.value === goal.id))
    .filter(goal => !copy.desCorrelations.some(e => e.meta.value === goal.id))
}

/*
  ascending correlations
*/
export const undeletedAsc = ({ copy }) => {
  if (!copy.ascCorrelations) return []

  return copy.ascCorrelations.filter(e => !e.deleted)
}

/*
  descending correlations
*/
export const undeletedDes = ({ copy }) => {
  if (!copy.desCorrelations) return []

  return copy.desCorrelations.filter(e => !e.deleted)
}
