export const stateLgas = state => {
  return state.currentState ? state.stateLGAs[state.currentState] : {}
}
