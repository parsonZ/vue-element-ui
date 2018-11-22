<template>
  <div class="loading_wrapper" v-show="mode">
    <div id="loader" class="pageload-overlay pageload-loading" data-opening="M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z" data-closing="M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
            <path d="M0,0C0,0,80,0,80,0C80,0,80,60,80,60C80,60,0,60,0,60C0,60,0,0,0,0"></path>
          <desc>Created with Snap</desc><defs></defs></svg>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      loadingContent: Object
    },
    data() {
      return {
        content: this.loadingContent,
        mode: false
      }
    },
    mounted(){
    },
    methods: {
      show(){
        this.mode = true
      },
      hide(){
        this.mode = false
      }
    }
  }
</script>
<style scoped>
  .loading_wrapper{
    background: rgba(0, 0, 0, 0.24);
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 10000;
    top: 0;
  }
  .pageload-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    visibility: hidden;
  }

  .pageload-overlay svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .pageload-overlay svg path {
    fill: #fff;
  }

  .pageload-overlay::after,
  .pageload-overlay::before {
    content: '';
    position: fixed;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -10px;
    border-radius: 50%;
    visibility: hidden;
    opacity: 0;
    z-index: 1000;
    transition: opacity 0.15s, visibility 0s 0.15s;
  }

  .pageload-overlay::after {
    background: #6cc88a;
    transform: translateX(-20px);
    animation: moveRight 0.6s linear infinite alternate;
  }

  .pageload-overlay::before {
    background: #4fc3f7;
    transform: translateX(20px);
    animation: moveLeft 0.6s linear infinite alternate;
  }

  @keyframes moveRight {
    to { transform: translateX(20px); }
  }
  @keyframes moveLeft {
    to { transform: translateX(-20px); }
  }

  .pageload-loading.pageload-overlay::after,
  .pageload-loading.pageload-overlay::before {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s;
  }
</style>