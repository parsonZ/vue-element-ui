const sidebar = {
  state: {
    show: false
  },
  mutations: {
    changeState(state) {
      state.show = !state.show
    }
  },
  actions: {
    changeState({commit}) {
      commit('changeState')
    }
  },
  getters: {
    getSidebarState(state) {
      return state
    }
  }
}

export default sidebar