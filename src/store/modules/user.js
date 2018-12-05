const user = {
  state: {
    id: ''
  },
  mutations: {
    login(state, n) {
      state.id = n
    }
  },
  actions: {
    login({commit}, n) {
      commit('login', n)
    }
  }
}

export default user