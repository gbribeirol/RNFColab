export function SET_CURRENT_FEATURE (state, param) {
  state.app.currentFeature = param
  // Vue.set(state.app, 'currentFeature', param)
  // state.app = { ...state.app, currentFeature: param }
}

export function CURRENT_ROUTER (state, param) {
  state.app.currentRoute = param
}

export function PREVIOUS_ROUTER (state, param) {
  state.app.previousRoute = param
}

export function SET_AVATAR (state, param) {
  state.app.avatar = param
}
