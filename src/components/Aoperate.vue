<template>
  <div id="operate">
    <div class="setting" :style="{'bottom': data.mt ? '-100%' : 0}">
      <i class="fa fa-dot-circle-o fa-2x"
        @click="show = !show" :style="{'color': show ? '#fff' : '#000'}"></i>

      <i class="fa fa-arrow-circle-o-up fa-2x" 
        :style="{'bottom': scrolltop ? '.5em' : -100+'px', 'position': 'relative'}"
        @click="$emit('back-to-top')"></i>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div id="drop-area" class="drop-area" v-if="show">
        <div @click="acollect_or_liked('collect', 0)" v-if="data.collected == 1" class="drop-area__item"><i class="fa fa-fw fa-star fa-lg fa-active"></i><span>取消收藏</span></div>
        <div @click="acollect_or_liked('collect', 1)" v-else class="drop-area__item"><i class="fa fa-fw fa-star-o fa-lg"></i><span>收藏</span></div>

        <div @click="acollect_or_liked('liked', 0)" v-if="data.liked == 1" class="drop-area__item"><i class="fa fa-fw fa-thumbs-up fa-lg fa-active"></i><span>取消点赞</span></div>
        <div @click="acollect_or_liked('liked', 1)" v-else class="drop-area__item"><i class="fa fa-fw fa-thumbs-o-up fa-lg"></i><span>点赞</span></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Velocity from 'velocity-animate'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        show: false,
        scrolltop: false
      }
    },
    methods: {
      atTop(){
        this.scrolltop = true
      },
      atBottom(){
        this.scrolltop = false
      },
      acollect_or_liked(name, type){
        this.$http.get('/collect_or_liked', {
          params: {
            name: name,
            type: type,
            userid: this.data.userid,
            articleid: this.data.articleid
          }
        }).then(res => {
          this.$notify({
            title: 'Tips',
            message: res.data.message,
            type: res.data.status == 200 ? 'success' : 'error'
          })
          
          if(name == 'collect') this.data.collected = type
          if(name == 'liked') this.data.liked = type
        })
      },
      beforeEnter(el){
        el.style.opacity = 0
      },
      enter(el, done){
        this.items = document.querySelectorAll('.drop-area__item');
        Velocity(el, { opacity: 1, top: 0 })
        for(let [index, item] of this.items.entries()) {
          Velocity(item, { top: '-50px' }, { duration: 500, delay: 100*index} )
          Velocity(item, { top: '+=50px' }, { duration: 200 })
        }
      },
      leave(el, done){
        for(let [index, item] of this.items.entries()) {
          Velocity(item, { top: '-=50px' }, { duration: 200, delay: 100*index})
          Velocity(item, { top: '100%' }, { duration: 500})
        }
        Velocity(el, { opacity: 1, top: 'auto' }, { duration: 1000, complete: done })
      },
    }
  }
</script>
<style scoped lang="less">
  #operate{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .setting{
      position: fixed;
      display: flex;
      right: calc((100% - 960px) / 2 - 100px);
      z-index: 102;
      flex-direction: column;

      @media (max-width: 768px) {
        right: 2em;
      }
  
    }

    #drop-area{
      color: #2196f3;
      font-size: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 100%;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.65) 100%);
      z-index: 101;

      .fa-check-circle-o{
        top: 100%;
        position: fixed;
        color: #fff;
        font-size: 1em;
        transition: .3s;
        transition-delay: .2s !important;
      }

      

      .drop-area__item{
        margin: 0 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: 100%;
        
        @media (max-width: 768px) {
          margin: .5em;
        }

        span{
          font-size: .6em;
          display: inline-block;
          margin: 1em;
          color: #fff;
        }
      }
    }

    .fa{
      cursor: pointer;
      transition: .3s;
      margin: .4em 0;
      
      &:hover{
        color: #2196f3;
      }
    }

    .fa-active{
      color: #2196f3;
    }
  }
</style>

