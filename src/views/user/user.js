import '../../common/app'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#userMain",
  store,
  data: {
  	zoom: false,
  },
  methods: {
    zoomState(){
      this.zoom = !this.zoom
    },
    //获取user状态

  }
})