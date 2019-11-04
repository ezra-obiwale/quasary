import Vue from 'vue'

export const CAN_GO_BACK = (state, value) => {
  state.canGoBack = value
}

export const SET = (state, { key, value }) => {
  Vue.set(state, key, value)
}

export const SET_NIGERIAN_STATES = (state, states) => {
  state.states = states
}

export const SELECT_STATE = (state, currentState) => {
  state.currentState = currentState
}

export const SET_STATE_LGAS = (storeState, { state, lgas }) => {
  Vue.set(storeState.stateLGAs, state, lgas)
}

export const SET_TITLE = (state, title) => {
  state.title = title
}

export const SIDE_BAR = (state, status = true) => {
  state.sideBar = status
}

