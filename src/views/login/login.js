import '../../common/app'
import Vue from 'vue'
import Vuex from 'vuex'
import login from 'src/components/login'
import sign from 'src/components/sign'

Vue.use(Vuex)

new Vue({
  el: "#login",
  data: {},
  components: {
    login
  }
})

new Vue({
  el: "#sign",
  data: {},
  components: {
    sign
  }
})
