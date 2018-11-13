const other = {
  state: {
    name: 'other'
  },
  mutations: {
    changeName(state){
      state.name += 'hello'
    }
  },
  actions: {
    changeName({commit}) {
      commit('changeName')
    }
  },
  getters: {
    getOtherState(state) {
      return state;
    }
  }
}

export default other