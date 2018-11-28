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
                  <p v-html="content" class="articles_details" ref="articles_details">
                    <aplaceholder></aplaceholder>
                  </p>
              </article>
          </div>
          <button class="close-button" @click="$emit('show-scroll')"><i class="fa fa-close"></i><span>Close</span></button>
      </section>
  </div>
</template>
<script>
  import 'highlight.js/styles/default.css'
  import hljs from 'highlight.js'
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
            this.codeFromat()
          }
          if (res.data.status == 500) {
            this.$notify({
              title:'error', message: res.data.message, type: 'error'
            });
          }
        })
      },
      handleScroll(e) {
        //console.log(e)
        //console.log(e.wheelDelta)
      },
      codeFromat(){
        this.$nextTick(() => {
          let codes = document.querySelectorAll('code');
          for (let code of codes) {
            this.codeView(code);
            hljs.highlightBlock(code)
          }
          
        })
      },
      codeView(code){
        let type = code.getAttribute('data-code-type');
        let el = `<div>
          <span class="${type}">${type}</span>
          <span class="fullScreen">全屏</span>
          <span class="copy">复制</span>
        </div>`
        //code.insertBefore(el)
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
