import '../../common/app'
import '../../../static/css/grid.css'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#gridMain",
  store,
  data: {
    zoom: false,
    counts: '',
    loadingObj: {},
    lists: [],
    loadMoreBtn: true,
    params: {
      page: 1,
      counts: 2
    }
  },
  mounted(){
    this.init()
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
    init(){
      this.$refs.loading.show()
      this.getArticles()
      
    },
    initAnimate(){
      const gridInit = require('../../../static/js/gridAnimate.js')
      gridInit.init()
    },
    getArticles(){
      this.$http.get('/get_articles', {
        params: this.params
      }).then(res => {
        if(res.status == 200){
          if(this.lists.length >= res.data.counts){
            this.loadMoreBtn = false
            this.$refs.loading.hide()
            return false;
          }
          this.lists = [...this.lists, ...res.data.list]
          this.$nextTick(() => {
              this.initAnimate()
              this.$refs.loading.hide()
          })
        }else{
          this.$notify({
            title:'error', message: res.message, type: 'error'
          });
        }
      })
    },
    loadMore(){
      this.$refs.loading.show()
      this.params.page ++;
      this.getArticles()
    }
  }
})