import 'src/common/app'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#userMain",
  store,
  data: {
  	zoom: false,
  },
  computed: {
    sidebarStatus(){
      return this.$store.state.sidebar.show
    }
  },
  watch: {
    sidebarStatus(n, o){
      this.zoom = n
    }
  }
})