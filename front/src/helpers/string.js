export function strintToArrayObjIdName (s) {
  if (s) {
    var array = s.substr(1, s.length - 2).split("','")
    return array.map(el => ({ id: el, name: el }))
  } else {
    return []
  }
}

export function strintToArray (s) {
  if (s) {
    return s.substr(1, s.length - 2).split("','")
  } else {
    return []
  }
}
