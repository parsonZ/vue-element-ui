import {Vue, store} from '../../common/app.js'

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
