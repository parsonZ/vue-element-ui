import '../../common/app'

import '../../../static/css/grid.css'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#gridMain",
  store,
  data: {
    zoom: false
  },
  mounted(){
    const gridInit = require('../../../static/js/gridAnimate.js')
    gridInit.init()
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