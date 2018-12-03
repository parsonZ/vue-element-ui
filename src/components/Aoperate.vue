<template>
  <div id="operate">
    <div class="setting">
      <i class="fa fa-dot-circle-o fa-2x"
        @click="show = true" v-if="!show"></i>

      <i class="fa fa-arrow-circle-o-up fa-2x" 
        :style="{'bottom': scrolltop ? 0 : -100+'px', 'position': 'relative'}"
        @click="$emit('back-to-top')"></i>
    </div>
    
    <div id="drop-area" class="drop-area" :class="{'show': show}">
      <div class="drop-area__item"><i class="fa fa-fw fa-share-square fa-lg"></i><span>分享</span></div>
      <div class="drop-area__item"><i class="fa fa-fw fa-star-o fa-lg"></i><span>收藏</span></div>
      <div class="drop-area__item"><i class="fa fa-fw fa-thumbs-o-up fa-lg"></i><span>点赞</span></div>
      <div class="drop-area__item"><i class="fa fa-fw fa-user-secret fa-lg"></i><span>我的</span></div>
      <i class="fa fa-check-circle-o fa-2x" 
        :class="{'circle-close': show}"
        @click="show = false"></i>
    </div>
  </div>
</template>
<script>
  export default {
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
      bottom: 3em;
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
      transition: .3s;
      opacity: 0;
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

      .circle-close{
        top: 70%;
      }

      .drop-area__item{
        margin: 0 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        
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

    .show{
      top: 0 !important;
      opacity: 1 !important;
    }
  }
</style>

