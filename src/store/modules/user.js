import util from 'src/common/util.js'

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
      util.addStorage('userid', n)
      commit('login', n)
    },
    logout({commit}){
      util.removeStorage('userid');
      commit('logout')
    }
  }
}

export default user