// state, getters, rootState, rootGetters

// export function feedListOptions ({ feedList }) {
//   return feedList.map(el => ({ label: el.name, value: el.id }))
//     .sort((a, b) => a.label > b.label ? 1 : -1)
// }

export const getExecPosts = ({ posts }, getters, rootState) => {
  if (rootState.auth.user && posts) {
    return posts.filter(el => el.owner.id === rootState.auth.user.id)
  }
}

export const filteredPosts = ({ posts, postSearchTerm, postSortField }, getters, rootState) => {
  let sorted
  if (postSortField.label === 'DATA') {
    sorted = posts.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1)
  } else if (postSortField.label === 'PARTICIPANTE') {
    sorted = posts.sort((a, b) => a.owner.name > b.owner.name ? 1 : -1)
  } else {
    sorted = posts.sort((a, b) => a.messageType > b.messageType ? 1 : -1)
  }

  let filteredByProject
  if (rootState.project.selected.id) {
    filteredByProject = sorted
      .filter(e => e.construction.value === rootState.project.selected.id)
  } else {
    return []
  }

  if (postSearchTerm === '') {
    return filteredByProject
  }

  const words = postSearchTerm.split('+')
  const searchProps = ['message', 'messageType', 'owner.name']

  return filteredByProject.filter(e => {
    return words.every(word => {
      return searchProps.some(prop => {
        const field = ('e["' + prop + '"]').replace('.', '"]["')

        // eslint-disable-next-line no-eval
        const dado = eval(field)
        if (dado) {
          return dado.toLowerCase().indexOf(word.toLowerCase()) > -1
        } else {
          return false
        }
        // return e[prop.name].toString().toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })
  })
}
