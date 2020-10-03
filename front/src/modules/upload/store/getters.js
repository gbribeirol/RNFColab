// export function feedListOptions ({ feedList }) {
//   return feedList.map(el => ({ label: el.name, value: el.id }))
//     .sort((a, b) => a.label > b.label ? 1 : -1)
// }

export function fileTypesFiltered ({ fileTypes, supportedFileTypes }) {
  if (!supportedFileTypes) {
    return fileTypes
  } else {
    return fileTypes.filter(el => supportedFileTypes.includes(el.value))
  }
}

export function fileTypesFilteredOptions (state, getters) {
  return getters.fileTypesFiltered.map(el => {
    return { label: el.label, value: el }
  })
}

export function fullPathStorage (state, getters) {
  if (!state.folder) {
    return state.mainPath
  } else {
    return state.mainPath + '/' + state.folder
  }
}

export function acceptedFromSelectedTypes (state, getters) {
  let acc = ''
  state.selectedFileType.forEach(e => {
    acc = acc + e.acceptType.join(',') + ', '
  })

  return acc.substring(0, acc.length - 2)
}
