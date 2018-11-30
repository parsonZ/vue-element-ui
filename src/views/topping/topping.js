import 'src/common/app'
import 'src/common/css/grid.css'

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
      counts: 6
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
        return res.data
      }).then(res => {
        if(res.status == 200) {
          if(this.propsData.lists.length >= res.counts){
            this.propsData.loadMoreBtn = false
            this.$refs.loading.hide()
            return false;
          }
          res.list.map( item => {
            item['localData'] = new Date(item.create_time).toLocaleDateString()
            item['localTime'] = new Date(item.create_time).toLocaleTimeString()
            return item;
          })
          this.propsData.lists = [...this.propsData.lists, ...res.list]
        } else {
          this.$notify({
            title:'error', message: res.message, type: 'error'
          });
        }
        this.$refs.loading.hide()
      })
    },
    loadMore(){
      this.$refs.loading.show()
      this.params.page ++;
      this.getArticles()
    }
  }
})