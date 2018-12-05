<template>
  <nav id="menu_user" class="menu_user" ref="menu_user">
    <div class="morph-shape_user" data-morph-open="M260,500H0c0,0,8-120,8-250C8,110,0,0,0,0h260c0,0-8,110-8,250C252,380,260,500,260,500z">
      <svg width="100%" height="100%" viewBox="0 0 260 500" preserveAspectRatio="none">
        <path fill="none" d="M260,500H0c0,0,0-120,0-250C0,110,0,0,0,0h260c0,0,0,110,0,250C260,380,260,500,260,500z"/>
      </svg>
    </div>
    <button class="menu__label_user"><i class="fa fa-fw fa-user-circle-o"></i><span>{{data.username}}</span></button>
    <ul class="menu__inner_user">
      <li @click="logOnout"><a href="#"><i class="fa fa-fw fa-sign-out"></i><span>登出</span></a></li>
      <li><a href="#"><i class="fa fa-fw fa-plus-circle"></i><span>其他</span></a></li>
    </ul>
    <adialog :dialog-content="dialogObj" ref="dialogContent"></adialog>
  </nav>
</template>

<script>
  
  import SVGDDMenu from 'src/common/js/menu.js'
  import { mapActions, mapState } from 'vuex'

  export default {
    props: {
      data: Object
    },
    data() {
      return {
        dialogObj: {
          title: '注销登录',
          content: '确认退出登录吗?',
          type: 1
        }
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        new SVGDDMenu( this.$refs.menu_user, {
          name: 'menu_user'
        } );
      },
      logOnout(){
        //this.logout('') //提交登出actions
        //this.$http.post('/logout').then(res => {
          //this.$notify({
            //title: 'Tips', message: res.data.message, type: res.data.status == 200 ? 'success':'error'
          //});
        //})
        this.$refs.dialogContent.toggle()
      },
      ...mapActions([
        'logout'
      ])
    }
  }
</script>

<style scoped>
  .menu_user {
    position: absolute;
    text-align: left;
    right: 0;
    top: 0;
    cursor: pointer;
    z-index: 100;
    width: 150px;
  }

  .menu__label_user {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    width: 100%;
    height: 50px;
    padding: 0 1.25em;
    font-size: 1.5em;
    color: #fff;
    position: relative;
    outline: none;
    text-align: left;
  }

  .menu__inner_user li a span,
  .menu__label_user span {
    font-size: 0.68em;
    letter-spacing: 1px;
    line-height: 1.2;
    font-weight: 600;
  }

  .menu_user .fa {
    vertical-align: top;
    line-height: 1.25;
    margin-right: 0.3em;
    font-size: 1.15em;
  }

  .menu__inner_user {
    list-style: none;
    padding: 0 1.5em;
    font-size: 1.3em;
    margin: 0;
    position: absolute;
    overflow: hidden;
    height: 0;
    transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
  }

  .menu_user.menu--open_user .menu__inner_user {
    height: 100px;
    width: 100%;
  }

  .menu__inner_user li a {
    display: block;
    padding: 0.53em 0;
    line-height: 1.2;
    opacity: 0;
    color: #848484;
    pointer-events: none;
    outline: none;
    transform: translate3d(0, -20px, 0);
    transition: opacity 0.3s, transform 0.3s;
  }

  .menu__inner_user li a:hover {
    color: #fff;
  }

  .menu--open_user .menu__inner_user li a {
    opacity: 1;
    pointer-events: auto;
    transform: translate3d(0, 0, 0);
  }

  .menu--open_user .menu__inner_user li:nth-child(2) a {
    transition-delay: 0.04s;
  }

  .menu--open_user .menu__inner_user li:nth-child(3) a {
    transition-delay: 0.08s;
  }

  .menu--open_user .menu__inner_user li:nth-child(4) a {
    transition-delay: 0.12s;
  }

  .menu--open_user .menu__inner_user li:nth-child(5) a {
    transition-delay: 0.16s;
  }

  .menu--open_user .menu__inner_user li:nth-child(6) a {
    transition-delay: 0.2s;
  }

  .morph-shape_user,
  .morph-shape_user svg {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  .morph-shape_user {
    transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
  }

  .morph-shape_user svg {
    height: 100%;
  }

  .menu_user.menu--open_user .morph-shape_user {
    height: 170px;
  }

  .morph-shape_user svg path {
    fill: transparent;
  }
</style>
