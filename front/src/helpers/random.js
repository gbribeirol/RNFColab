export function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function shuffleArrayObjects (arr) {
  let rand, temp, i

  for (i = arr.length - 1; i > 0; i--) {
    rand = Math.floor((i + 1) * Math.random())
    temp = arr[rand]
    arr[rand] = arr[i]
    arr[i] = temp
  }
  return arr
}
