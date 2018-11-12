import '../../common/app'
import './login.css'

import Vue from 'vue'
import Vuex from 'vuex'
import login from 'src/components/login'
import register from 'src/components/register'

Vue.use(Vuex)

new Vue({
  el: "#login",
  data: {},
  components: {
    login
  }
})

new Vue({
  el: "#register",
  data: {},
  components: {
    register
  }
})
