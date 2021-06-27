const state = {
  logged: false
}

const mutations = {
  SET_STATUS (state, { status }) {
    state.logged = status
  }
}

const actions = {
  setStatus ({ commit }, { status }) {
    // do something async
    commit('SET_STATUS', {
      status
    })
  }
}

export default {
  state,
  mutations,
  actions
}
