const fb = require('../../firebase-helpers/firebaseConfig')

export default {
  state: {
    currentUser: null,
    researcher: {}
  },
  actions: {
    fetchResearcher ({commit, state}) {
      console.log('state', state)
      fb.researcherColletion.doc(state.currentUser.uid).get().then(res => {
        console.log('res.data', res)
        commit('setResearcher', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setResearcher', {})
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setResearcher (state, val) {
      state.researcher = val
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    currentResearcher: state => state.researcher
  }
}
