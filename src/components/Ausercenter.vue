<template>
  <nav id="menu_user" class="menu_user" ref="menu_user">
    <div class="morph-shape_user" data-morph-open="M260,500H0c0,0,8-120,8-250C8,110,0,0,0,0h260c0,0-8,110-8,250C252,380,260,500,260,500z">
      <svg width="100%" height="100%" viewBox="0 0 260 500" preserveAspectRatio="none">
        <path fill="none" d="M260,500H0c0,0,0-120,0-250C0,110,0,0,0,0h260c0,0,0,110,0,250C260,380,260,500,260,500z"/>
      </svg>
    </div>
    <button class="menu__label_user"><i class="fa fa-fw fa-bars"></i><span>Open Menu</span></button>
    <ul class="menu__inner_user">
      <li><a href="#"><i class="fa fa-fw fa-bookmark-o"></i><span>Reading List</span></a></li>
      <li><a href="#"><i class="fa fa-fw fa-hdd-o"></i><span>Saved Items</span></a></li>
      <li><a href="#"><i class="fa fa-fw fa-image"></i><span>All Media</span></a></li>
      <li><a href="#"><i class="fa fa-fw fa-heart-o"></i><span>Favorites</span></a></li>
      <li><a href="#"><i class="fa fa-fw fa-envelope-o"></i><span>Messages</span></a></li>
      <li><a href="#"><i class="fa fa-fw fa-bell-o"></i><span>Notifications</span></a></li>
    </ul>
  </nav>
</template>

<script>
  
  import SVGDDMenu from 'src/common/js/menu.js'
  export default {
    data() {
      return {}
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        new SVGDDMenu( this.$refs.menu_user, {
          name: 'menu_user'
        } );
      }
    }
  }
</script>

<style scoped>
  .menu_user {
    width: 200px;
    height: 70px;
    position: absolute;
    top: 1em;
    right: 1em;
    text-align: left;
    cursor: pointer;
    z-index: 100;
  }

  .menu__label_user {
    display: block;
    background: none;
    border: none;
    width: 100%;
    height: 70px;
    padding: 0 1.25em;
    font-size: 1.3em;
    color: #fff;
    position: relative;
    outline: none;
    text-align: left;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent; /* For some Androids */
  }

  .menu__inner_user li a span,
  .menu__label_user span {
    font-size: 0.68em;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.2;
    font-weight: 600;
  }

  .menu_user .fa {
    vertical-align: top;
    line-height: 1.25;
    margin-right: 0.65em;
    font-size: 1.15em;
  }

  .menu__inner_user {
    list-style: none;
    padding: 0 1.25em;
    font-size: 1.3em;
    margin: 0;
    position: absolute;
    overflow: hidden;
    height: 0;
    -webkit-transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
    transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
  }

  .menu_user.menu--open_user .menu__inner_user {
    height: 310px;
  }

  .menu__inner_user li a {
    display: block;
    padding: 0.53em 0;
    line-height: 1.2;
    opacity: 0;
    color: #727476;
    pointer-events: none;
    outline: none;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: opacity 0.3s, transform 0.3s;
  }

  .menu__inner_user li a:hover {
    color: #45484A;
  }

  .menu--open_user .menu__inner_user li a {
    opacity: 1;
    pointer-events: auto;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .menu--open_user .menu__inner_user li:nth-child(2) a {
    -webkit-transition-delay: 0.04s;
    transition-delay: 0.04s;
  }

  .menu--open_user .menu__inner_user li:nth-child(3) a {
    -webkit-transition-delay: 0.08s;
    transition-delay: 0.08s;
  }

  .menu--open_user .menu__inner_user li:nth-child(4) a {
    -webkit-transition-delay: 0.12s;
    transition-delay: 0.12s;
  }

  .menu--open_user .menu__inner_user li:nth-child(5) a {
    -webkit-transition-delay: 0.16s;
    transition-delay: 0.16s;
  }

  .menu--open_user .menu__inner_user li:nth-child(6) a {
    -webkit-transition-delay: 0.2s;
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
    height: 70px;
    -webkit-transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
    transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
  }

  .morph-shape_user svg {
    height: 100%;
  }

  .menu_user.menu--open_user .morph-shape_user {
    height: 360px;
  }

  .morph-shape_user svg path {
    fill: #C6CFCF;
  }
</style>
