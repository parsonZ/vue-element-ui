<template>
  <div>
    <div id="tag_grid">
      <div class="tag_grid_item" draggable="true" v-for="tag in tags" :data-id="tag.tag_id" 
        @dragstart="dragstart($event)" 
        @dragend="dragend($event)"
        @touchstart="touchstart">
        <i class="fa fa-check-circle" v-if="tag.isCheck" draggable="false"></i>
        <img :src="tag.tag_img" draggable="false">
        <div draggable="false">
          {{tag.tag_name}}
        </div>
      </div>
    </div>
    <transition
      @enter="enter"
      @leave="leave">
      <div id="drop_wrapper" v-if="isstart">
        <div id="drop-area" class="drop-area">
          <div class="drop-area__item" 
            data-type="add"
            @drop="drop($event)" 
            @dragenter="dragenter($event)"
            @dragleave="dragleave($event)"
            @dragover.stop.prevent="dragover($event)">
              <i class="fa fa-lock fa-2x"></i>
              <span>添加至我的标签</span>
            </div>
          <div class="drop-area__item" 
            data-type="del"
            @drop="drop($event)" 
            @dragenter="dragenter($event)"
            @dragleave="dragleave($event)"
            @dragover.stop.prevent="dragover($event)">
              <i class="fa fa-unlock fa-2x"></i>
              <span>从我的标签删除</span>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate'
  import classie from 'src/common/js/classie.js'
  export default {
    data() {
      return {
        isstart: false,
        id: ''
      }
    },
    props: {
      tags: Array
    },
    methods: {
      touchstart(){
        alert('das')
      },
      dragstart(e){
        this.id = e.target.dataset.id
        this.isstart = true
        classie.add(e.target, 'is-active')
      },
      dragend(e){
        this.isstart = false
        classie.remove(e.target, 'is-active')
      },
      dragover(e){
        //该事件必须存在
      },
      dragenter(e){
        classie.add(e.target, 'is-dragover')
      },
      dragleave(e){
        classie.remove(e.target, 'is-dragover')
      },
      drop(e){
        let type = e.target.dataset.type;
        this.$emit('operate-tags', {
          id: this.id,
          type
        })
      },
      enter(el, done){
        Velocity(el, { opacity: 1 },{ duration: 300})
        Velocity(document.querySelector('#drop-area'), { opacity: 1, padding: '2em' },{ duration: 300, complete: done })
      },
      leave(el, done){
        Velocity(document.querySelector('#drop-area'), { opacity: 0, padding: '5em' },{ duration: 300, complete: done })
        Velocity(el, { opacity: 0 },{ duration: 300, complete: done})
      },
    }
  }
</script>
<style lang="less" scoped>
  #tag_grid{
    margin: 0 auto;
    padding: 0 1em;
    text-align: center;

    .tag_grid_item{
      display: inline-block;
      margin: 0.4em;
      padding-top: 2.25em;
      width: 7.5em;
      height: 7.5em;
      border-radius: 4px;
      background: #403E45;
      color: #76737C;
      text-align: center;
      font-size: 1.5em;
      cursor: -webkit-grab;
      user-select: none;
      position: relative;

      &:hover{
        background: #1b1b1b;
        color: #fff;
      }

      &:active{
        cursor: -webkit-grabbing;
      }

      img{
        width: 2em;
        height: 2em;
      }

      .fa{
        position: absolute;
        top: .3em;
        right: .3em;
        color: #fff;
      }
    }

    .is-active{
      background: #1b1b1b;
      color: #fff;
      cursor: -webkit-grabbing;
    }
  }

  #drop_wrapper{
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    background: rgba(12, 12, 12, 0.4);
    opacity: 0;
    z-index: 2;

    #drop-area{
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      padding: 5em;
      color: #0ac1fb;
      display: flex;
      transform: translate(-50%, -50%);
      border-radius: .5em;
      opacity: 0;

      .drop-area__item{
        position: relative;
        display: inline-block;
        width: 15em;
        height: 15em;
        margin: 1em;
        border-radius: 6px;
        background: rgba(0,0,0,0.05);
        transition: transform 0.3s, background 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .is-dragover{
        transform: scale(1.1);
      }
    }
  }

  @media screen and (max-width: 50em){
    .tag_grid_item {
      font-size: 1.5em !important;
    }
  }
</style>