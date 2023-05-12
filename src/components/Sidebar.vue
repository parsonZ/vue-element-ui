<template>
  <div id="menu" class="menu">
      <button class="menu__handle" @click="onChangeSidebarState"><span>Menu</span></button>
      <div class="menu__inner">
          <ul>
              <li><a href="javascript:;" @click="redirecterTo('index')"><i class="fa fa-fw fa-home"></i>首页</a></li>
              <li><a href="javascript:;" @click="redirecterTo('article')"><i class="fa fa-fw fa-clipboard" aria-hidden="true"></i>标签</a></li>
              <li><a href="javascript:;" @click="redirecterTo('topping')"><i class="fa fa-fw fa-clipboard" aria-hidden="true"></i>全部</a></li>
              <!-- <li><a href="javascript:;" @click="redirecterTo('login')" v-if="userid==null || ''"><i class="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>登录</a></li> -->
              <!-- <li><a href="javascript:;" @click="redirecterTo('user')" v-if="userid"><i class="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>我的</a></li> -->
          </ul>
      </div>
      <div class="morph-shape" data-morph-open="M300-10c0,0,295,164,295,410c0,232-295,410-295,410" data-morph-close="M300-10C300-10,5,154,5,400c0,232,295,410,295,410">
          <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none">
              <path fill="none" d="M300-10c0,0,0,164,0,410c0,232,0,410,0,410"/>
          </svg>
      </div>
  </div>
</template>

<script>
  import SVGDDMenu from 'src/common/js/menu.js'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        isClick: false,
        userid: ''
      }
    },
    mounted (){
      this.init()
      this.userid = this.getStorage('userid')
    },
    methods: {
      init(){
        new SVGDDMenu( document.getElementById( 'menu' ), {
          name: 'sidebar'
        });
      },
      onChangeSidebarState(){
        this.$store.dispatch('changeState')
        this.$emit('zoom')
      },
      redirecterTo(href){
        window.location.href = `${href}.html`;
      }
    },
    computed: {
      ...mapState([
        'user'
      ]),
      getUserId(){
        return this.user.id
      }
    },
    watch: {
      getUserId(n, o){
        this.userid = n
      }
    }
  }
</script>
