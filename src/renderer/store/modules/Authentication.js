const fb = require('../../firebase-helpers/firebaseConfig')

export default {
  state: {
    currentUser: null,
    userProfile: {}
  },
  actions: {
    fetchUserProfile ({commit, state}) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    }
  }
}
