import Http from '@ezraobiwale/http'

export const LOAD_NIGERIAN_STATES = async ({ commit, state }) => {
  if (Object.keys(state.states).length) {
    return state.states
  }

  return new Http()
    .get('//nigeria.herokuapp.com/api/v1/states/')
    .then(resp => {
      commit('SET_NIGERIAN_STATES', resp.data)
      return resp.data
    })
}

export const LOAD_STATE_LGAS = async ({ commit, state }, fromState) => {
  if (!fromState) {
    return Promise.reject(new Error('Invalid state'))
  }

  if (Object.keys((state.stateLGAs[fromState] || {})).length) {
    return Promise.resolve(state.stateLGAs[fromState])
  }

  return new Http()
    .get(`//nigeria.herokuapp.com/api/v1/states/${fromState}/lgas`)
    .then(resp => {
      commit('SET_STATE_LGAS', { state: fromState, lgas: resp.data })
      return resp.data
    })
}
