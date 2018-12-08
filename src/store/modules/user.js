const user = {
  state: {
    id: ''
  },
  mutations: {
    login(state, n) {
      state.id = n
    },
    logout(state, n) {
      state.id = n
    }
  },
  actions: {
    login({commit}, n) {
      window.localStorage.setItem('userid', n)
      commit('login', n)
    },
    logout({commit}){
      window.localStorage.removeItem('userid');
      commit('logout')
    }
  }
}

export default user