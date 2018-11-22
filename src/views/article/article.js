import '../../common/app'
import '../../../static/css/grid.css'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import classie from 'src/common/static/js/classie.js'
import DragSlideshow from 'src/common/static/js/dragslideshow.js'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#main",
  store,
  data: {
    lists: [],
    zoom: false,
    slideshow: {},
    loadingObj: {},
    hiddenPageScroll: true,
    params: {
      page: 1,
      counts: 1,
      tag_type: ''
    },
    propsData: {
      lists: [],
      loadMoreBtn: true,
      marginTop: 0
    },
    tag_list: []
  },
  mounted(){
    this.init()
  },
  computed: {
    sidebarStatus(){
      return this.$store.state.sidebar.show
    },
    slideCounts(){
      return this.lists.length
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
      this.getAboutMe()
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
    getAboutMe(){
      this.$http.get('/get_tags', {}).then(res => {
        if(res.status == 200){
          this.lists = res.data.list;
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
    getTagType (id){
      if (!this.slideshow.isContent) {
        
        //初始化参数
        this.params = {
          page: 1,
          counts: 1,
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
      this.getArticlesByTag()
    },
    hiddenScroll(){
      this.hiddenPageScroll = false
    },
    showScroll(){
      this.hiddenPageScroll = true
    }
  }
})