<template>
  <div id="theGrid" :style="{top: top+'px'}">
      <section class="grid">
          <a class="grid__item" href="#" @click="articleDetails(item.id)" v-for="item in data.lists" :dataId="item.id">
              <h2 class="title title--preview" style="font-size: 1.5em;">{{item.title}}</h2>
              <div class="loader"></div>
              <span class="category">{{item.author}}</span>
              <div class="meta meta--preview">
                  <img class="meta__avatar" src="../common/img/authors/4.png" alt="author01" /> 
                  <span class="meta__date"><i class="fa fa-calendar-o"></i> 9 Apr</span>
                  <span class="meta__reading-time"><i class="fa fa-clock-o"></i> 3 min read</span>
              </div>
          </a>
          <footer class="page-meta">
              <span @click="$emit('load-more')" v-if="data.loadMoreBtn">Load more...</span>
              <span v-else>no results ...</span>
          </footer>
      </section>
      <section class="content_me">
          <div class="scroll-wrap" @mousewheel="handleScroll($event)">
              <article class="content__item" v-for="item in data.lists" :dataContentId="item.id">
                  <h2 class="title title--full" style="font-size: 1.5em;">{{item.title}}</h2>
                  <div class="meta meta--full">
                      <img class="meta__avatar" src="../common/img/authors/4.png" alt="author01" />
                      <span class="meta__author">{{item.author}}</span>
                      <span class="meta__date"><i class="fa fa-calendar-o"></i> 9 Apr</span>
                      <span class="meta__reading-time"><i class="fa fa-clock-o"></i> 3 min read</span>
                  </div>
                  <p v-html="content">
                    <aplaceholder></aplaceholder>
                  </p>
              </article>
          </div>
          <button class="close-button" @click="$emit('show-scroll')"><i class="fa fa-close"></i><span>Close</span></button>
      </section>
  </div>
</template>
<script>
  import '../common/css/markdown.css'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        top: 0,
        content: ''
      }
    },
    mounted(){
    },
    methods: {
      init(){
        const gridInit = require('../common/js/gridAnimate.js')
        gridInit.init()
      },
      articleDetails(id) {
        this.$emit('hidden-scroll')
        this.$http.get('/get_article_details/'+id).then(res => {
          if( res.status == 200 ) {
            this.content = res.data.data
          } else {

          }
        })
      }
    },
    computed: {
      lists(){
        return this.data.lists;
      },
      m(){
        return this.data.marginTop;
      }
    },
    watch: {
      lists(){
        this.$nextTick(() => {
          this.init()
        })
      },
      m(n, o){
        this.top = n
      }
    }
  }
</script>

<style scoped>
  .grid-componments.effect-2 li.animate {
    transform: translateY(200px);
    animation: moveUp 0.65s ease forwards;
  }
  #theGrid{
    background: #fff;
    position: absolute;
    transition: .3s;
    height: 100%;
    width: 100%;
  }
  @-webkit-keyframes moveUp {
    0% { }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes moveUp {
    0% { }
    100% { transform: translateY(0); transform: translateY(0); opacity: 1; }
  }

  .title-full-fixed{
    font-size: 1.3em;
    position: fixed;
    top: 0;
    padding: 50px 50px 20px 50px;
    width: calc(100% - 2.5em);
    background: #fff;
    z-index: 1;
  }
</style>