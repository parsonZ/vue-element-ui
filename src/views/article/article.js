import 'src/common/app'
import 'src/common/css/grid.css'
const requireImg = require('src/common/img/articles/1.jpg')
import classie from 'src/common/js/classie.js'
import DragSlideshow from 'src/common/js/dragslideshow.js'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#main",
  store,
  data: {
    lists: [],
    zoom: false,
    slideshow: {},
    hiddenPageScroll: true,
    params: {
      page: 1,
      counts: 6,
      tag_type: ''
    },
    propsData: {
      lists: [],
      loadMoreBtn: true,
      marginTop: 0
    },
    bgImg: requireImg,
    pageScrollTop: 0,
    pageScrollRange: 30
  },
  created(){
    //获取user
    this.userid = window.localStorage.getItem('userid')
    this.$store.dispatch('login', this.userid)
  },
  mounted(){
    this.init()
  },
  computed: {
    slideCounts(){
      return this.lists.length
    }
  },
  methods: {
    init(){
      this.getTags()
    },
    zoomState() {
      this.zoom = !this.zoom
    },
    initAnimate(){
      this.slideshow = new DragSlideshow( this.$refs.slideshow, { 
        onToggle : this.toggleBtnn,
        onToggleContent : this.toggleCtrls,
        onToggleContentComplete : this.toggleCompleteCtrls
      });
    },
    toggleCompleteCtrls () {
      if( !this.slideshow.isContent ) {
        classie.remove( this.$refs.header, 'hide' );
      } else {
        this.propsData.marginTop = document.querySelector('.content.show').clientHeight
      }
    },
    toggleCtrls() {
      if( !this.slideshow.isContent ) {
        classie.add( this.$refs.header, 'hide' );
      }
    },
    toggleBtnn() {
      if( this.slideshow.isFullscreen ) {
        classie.add( this.$refs.switchBtnn, 'view-maxi' );
      } else {
        classie.remove( this.$refs.switchBtnn, 'view-maxi' );
      }
    },
    toggleSlideshow(){
      this.slideshow.toggle();
    },
    getTags(){
      this.$http.get('/get_tags', {
        params: {
          userid: this.userid
        }
      }).then(res => {
        return res.data;
      }).then(res => {
        if(res.status == 200) {
          this.lists = res.list;
          this.$nextTick(() => {
              this.initAnimate()
          })
        } else {
          this.$notify({
            title:'error', message: res.message, type: 'error'
          });
        }
      })
    },
    getTagType (id){
      if (!this.slideshow.isContent) {
        
        //初始化参数
        this.params = {
          page: 1,
          counts: this.params.counts,
          tag_type: id
        }
        this.propsData.loadMoreBtn = true
        this.propsData.lists = []
        
        this.getArticlesByTag()
      }
    },
    getArticlesByTag(){
      const that = this
      this.$http.get('/get_articles', {
        params: this.params
      }).then(res => res.data).then( res => {
        if(res.status == 200){
          if(this.propsData.lists.length >= res.counts){
            this.hiddenPageScroll = this.propsData.lists.length;
            this.propsData.loadMoreBtn = false
            return false;
          }
          res.list.map( item => {
            item['localData'] = new Date(item.create_time).toLocaleDateString()
            item['localTime'] = new Date(item.create_time).toLocaleTimeString()
            return item;
          })
          this.propsData.lists = [...this.propsData.lists, ...res.list]
          this.hiddenPageScroll = this.propsData.lists.length;
        }else{
          this.$notify({
            title:'error', message: res.message, type: 'error'
          });
        }
      })  
    },
    loadMore(){
      this.params.page ++;
      this.getArticlesByTag()
    },
    hiddenScroll(){
      this.hiddenPageScroll = false
    },
    showScroll(){
      this.hiddenPageScroll = true
    },
    pageScrollHandle(e){
      this.pageScrollTop = e.target.scrollTop
    }
  }
})