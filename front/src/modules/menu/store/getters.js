// export const groupsWithoutItemSelected = ({ app }) => {
//   const filted = app.menuOption
//     .filter(el => el.label !== app.currentFeatureName)
//   return filted
// }

// export const getGroups = ({ app }, getters) => {
//   // const groups = getters.groupsWithoutItemSelected.map(el => el.group)
//   // const groupsWithoutDuplicity = app.menuOption
//   //   .filter((el, pos, arr) => arr.indexOf(el) === pos)
//   // return groupsWithoutDuplicity

//   return app.menuOption
//     .map(el => el.group)
//     .filter((el, pos, arr) => arr.indexOf(el) === pos)
// }

// export const  menuOptionFbyGroup = ({ app }, getters) => {
//   // const groups = getters.groupsWithoutItemSelected.map(el => el.group)
//   // const groupsWithoutDuplicity = app.menuOption
//   //   .filter((el, pos, arr) => arr.indexOf(el) === pos)
//   // return groupsWithoutDuplicity

//   return app.menuOption
//     .map(el => el.group)
//     .filter((el, pos, arr) => arr.indexOf(el) === pos)
// }
