
export default {
  state: {
    listExperiment: []
  },
  actions: {
    setListExperiment ({commit}, value) {
      commit('setListExperiment', value)
    }
  },
  mutations: {
    setListExperiment (state, value) {
      state.listExperiment = value
    }
  },
  getters: {
    listExperiment: state => state.listExperiment
  }
}
