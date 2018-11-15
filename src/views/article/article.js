import '../../common/app'

import Vue from 'vue'
import store from 'src/store/index'

new Vue({
  el: "#main",
  store,
  data: {
    lists: [
      {
        id:'1',
        title: '分享4个新手快速晋升UI设计师的小技巧',
        smallTitle: '很多学设计的小伙伴在入门的时候不知道从何入手。本文就为大家总结一下UI设计学习的的4个技巧，相信对初学者一定非常有用。学习ui设计的小技巧之一：软件学习',
      },
      {
        id:'2',
        title: '10个Java Script难点',
        smallTitle: '为了保证可读性，本文采用意译而非直译，并且对示例代码进行了大量修改。另外，本文版权归原作者所有，翻译仅用于学习。小编推荐：Fundebug专注于JavaScript、微信小程序、微信小游戏，Node.js和Java线上bug实时监控。真的是一个很好用的bug监控服务，众多大佬公司都在使用。',
      },
      {
        id:'3',
        title: 'Es6之Spread Operater拷贝对象',
        smallTitle: '在Node v8.0.0中引入了对象展开运算符(object spread operator)（注：需要配合harmony标签使用），在此我用一篇博客来深入介绍一下。前端使用该语法需要引入babel 插件。',
      },
      {
        id:'4',
        title: '最常见的八种数组操作方法归纳总结',
        smallTitle: '返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入separator 字符串而生成的。',
      },
      {
        id:'5',
        title: 'JavaScript基础知识必知！',
        smallTitle: '很多学设计的小伙伴在入门的时候不知道从何入手。本文就为大家总结一下UI设计学习的的4个技巧，相信对初学者一定非常有用。学习ui设计的小技巧之一：软件学习',
      }
    ],
    zoom: false
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
      var overlay = document.getElementById( 'overlay' ),
        overlayClose = overlay.querySelector( 'button' ),
        header = document.getElementById( 'header' ),
        switchBtnn = header.querySelector( 'button.slider-switch' ),
        toggleBtnn = function() {
            if( slideshow.isFullscreen ) {
                classie.add( switchBtnn, 'view-maxi' );
            }
            else {
                classie.remove( switchBtnn, 'view-maxi' );
            }
        },
        toggleCtrls = function() {
            if( !slideshow.isContent ) {
                classie.add( header, 'hide' );
            }
        },
        toggleCompleteCtrls = function() {
            if( !slideshow.isContent ) {
                classie.remove( header, 'hide' );
            }
        },
        slideshow = new DragSlideshow( document.getElementById( 'slideshow' ), { 
            onToggle : toggleBtnn,
            onToggleContent : toggleCtrls,
            onToggleContentComplete : toggleCompleteCtrls
        }),
        toggleSlideshow = function() {
            slideshow.toggle();
            toggleBtnn();
        },
        closeOverlay = function() {
            classie.add( overlay, 'hide' );
        };

      // toggle between fullscreen and small slideshow
      switchBtnn.addEventListener( 'click', toggleSlideshow );
      // close overlay
      overlayClose.addEventListener( 'click', closeOverlay );
    }
  }
})