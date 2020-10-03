export function SET_DISPLAY_DRAWER (state, param) {
  state.displayDrawer = param
}

export function SWITCH_DRAWER (state) {
  state.displayDrawer = !state.displayDrawer
}
