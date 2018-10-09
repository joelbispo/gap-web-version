
export default {
  state: {
    alert: null
  },
  actions: {
    clearAlert ({commit}) {
      commit('clearAlert')
    },
    setSuccess ({commit}, msg) {
      commit('setAlert', {type: 'success', msg})
    },
    setWarning ({commit}, msg) {
      commit('setAlert', {type: 'warning', msg})
    },
    setInfo ({commit}, msg) {
      commit('setAlert', {type: 'info', msg})
    },
    setError ({commit}, erroMsg) {
      let msg = erroMsg || 'Aconteceu algum erro na aplicação, consulte o suporte'
      msg = msg.replace(/<[^>]*>/g, '')
      commit('setAlert', {type: 'error', msg})
    }
  },
  mutations: {
    setAlert (state, value) {
      state.alert = value
    },
    setError (state, value) {
      state.error = value
    },
    clearAlert (state) {
      state.alert = null
    }
  },
  getters: {
    alert: state => state.alert
  }
}
