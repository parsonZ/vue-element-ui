const loading = {
  state: {
    isopen: false
  },
  mutations: {
    openLoading(state) {
      state.isopen = true
    },
    closeLoading(state) {
      state.isopen = false
    }
  },
  actions: {
    openLoading({commit}) {
      commit('openLoading')
    },
    closeLoading({commit}) {
      commit('closeLoading')
    }
  },
  getters: {}
}

export default loading