
export default {
  state: {
    listExperiment: [],
    currentExperiment: null
  },
  actions: {
    setListExperiment ({commit}, value) {
      commit('setListExperiment', value)
    },
    setCurrentExperiment ({commit}, value) {
      commit('setCurrentExperiment', value)
    }
  },
  mutations: {
    setListExperiment (state, value) {
      state.listExperiment = value
    },
    setCurrentExperiment (state, value) {
      state.currentExperiment = value
    }
  },
  getters: {
    listExperiment: state => state.listExperiment,
    currentExperiment: state => state.currentExperiment
  }
}
