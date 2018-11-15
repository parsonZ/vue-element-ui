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
    setTimeout(this.testShowDialog, 3000)
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
  },
  methods: {
    testShowDialog(){
      this.$refs.dialogContent.modal()
    }
  }
})
