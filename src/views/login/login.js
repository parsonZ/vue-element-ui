import '../../common/app'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#start",
  store,
  data: {
    zoom: false
  },
  methods: {
    zoomState() {
      this.zoom = !this.zoom
    }
  }
})
