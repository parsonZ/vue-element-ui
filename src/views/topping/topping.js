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
    params: {
      page: 1,
      counts: 2
    },
    propsData: {
      lists: [],
      loadMoreBtn: true,
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
    getArticles(){
      this.$http.get('/get_articles', {
        params: this.params
      }).then(res => {
        if(res.status == 200){
          if(this.propsData.lists.length >= res.data.counts){
            this.propsData.loadMoreBtn = false
            this.$refs.loading.hide()
            return false;
          }
          this.propsData.lists = [...this.propsData.lists, ...res.data.list]
          this.$refs.loading.hide()
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