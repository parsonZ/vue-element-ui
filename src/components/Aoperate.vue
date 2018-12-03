<template>
  <div id="operate">
    <div class="setting" :style="{'bottom': data ? '-100%' : 0}">
      <i class="fa fa-dot-circle-o fa-2x"
        @click="show = true" v-if="!show"></i>

      <i class="fa fa-arrow-circle-o-up fa-2x" 
        :style="{'bottom': scrolltop ? 0 : -100+'px', 'position': 'relative'}"
        @click="$emit('back-to-top')"></i>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div id="drop-area" class="drop-area" v-if="show">
        <div class="drop-area__item"><i class="fa fa-fw fa-share-square fa-lg"></i><span>分享</span></div>
        <div class="drop-area__item"><i class="fa fa-fw fa-star-o fa-lg"></i><span>收藏</span></div>
        <div class="drop-area__item"><i class="fa fa-fw fa-thumbs-o-up fa-lg"></i><span>点赞</span></div>
        <div class="drop-area__item"><i class="fa fa-fw fa-user-secret fa-lg"></i><span>我的</span></div>
        <i class="fa fa-check-circle-o fa-2x" 
          @click="show = false"></i>
      </div>
    </transition>
  </div>
</template>
<script>
  import Velocity from 'velocity-animate'
  export default {
    props: {
      data: Number
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
      beforeEnter(el){
        el.style.opacity = 0
      },
      enter(el, done){
        Velocity(el, { opacity: 1, top: 0 })
        this.items = document.querySelectorAll('.drop-area__item');
        for(let [index, item] of this.items.entries()) {
          Velocity(item, { top: '-50px' }, { duration: 500, delay: 100*index} )
          Velocity(item, { top: '+=50px' }, { duration: 200 })
        }
        this.fa = document.querySelector('.fa-check-circle-o');
        Velocity(this.fa, { top: '70%' }, { duration: 500, complete: done })
      },
      leave(el, done){
        Velocity(this.fa, { top: '100%' }, { duration: 100 })
        for(let [index, item] of this.items.entries()) {
          Velocity(item, { top: '-=50px' }, { duration: 200, delay: 100*index})
          Velocity(item, { top: '100%' }, { duration: 500})
        }
        Velocity(el, { opacity: 1, top: 'auto' }, { duration: 1000, complete: done })
      }
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

      .fa{
        margin: .4em 0;
        cursor: pointer;
        transition: .3s;

        &:hover{
          color: #2196f3;
        }
      }

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
        left: 50%;
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

      .fa{
        cursor: pointer;
        color: #fff;
        transition: .3s;

        &:hover{
          color: #2196f3;
          transform: scale(1.1);
        }
      }
    }
  }
</style>

