import '../../common/app'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#main",
  store,
  data: {
    lists: [],
    zoom: false,
    slideshow: {}
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
      this.toggleBtnn();
    },
    getAboutMe(){
      this.$http.get('/get_resume', {}).then(res => {
        this.lists = res.data.list;
        this.$nextTick(() => {
            this.initAnimate()
        })
      })
    }
  }
})