import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

//导入module
import sidebar from './modules/sidebar.js'
import user from './modules/user.js'

export default new vuex.Store({
  modules: {
    sidebar,
    user
  }
})


