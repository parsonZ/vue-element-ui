import '../../common/app'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#start",
  store,
  data: {
    zoom: false,
    dialogObj: {
      title: 'test',
      content: 'hello world'
    }
  },
  mounted(){
    this.$refs.dialogContent.modal()
  },
  methods: {
    zoomState() {
      this.zoom = !this.zoom
    }
  }
})
