import {Vue, store} from '../../common/app.js'
import 'src/common/css/grid.css'

new Vue({
  el: "#gridMain",
  store,
  data: {
    zoom: false,
    counts: '',
    params: {
      page: 1,
      counts: 6
    },
    propsData: {
      lists: [],
      loadMoreBtn: true,
    },
    showTag: true
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.getArticles()
    },
    zoomState(){
      this.zoom = !this.zoom
    },
    getArticles(){
      this.$http.get('/get_articles', {
        params: this.params
      }).then(res => {
        return res.data
      }).then(res => {
        if(res.status == 200) {
          res.list.map( item => {
            item['localData'] = new Date(Number(item.create_time)).toLocaleDateString()
            item['localTime'] = new Date((Number(item.create_time))).toLocaleTimeString()
            return item;
          })
          this.propsData.lists = [...this.propsData.lists, ...res.list]
          if(res.list.length < this.params.counts){
            this.propsData.loadMoreBtn = false
          }
        } else {
          this.$notify({
            title:'error', message: res.message, type: 'error'
          });
        }
      })
    },
    loadMore(){
      this.params.page ++;
      this.getArticles()
    }
  }
})
