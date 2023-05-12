<template>
  <div id="theGrid" :style="{top: top+'px'}">
      <transition
        @enter="enter">
        <section class="grid" ref="grid" v-show="show">
          <a class="grid__item" href="#" data-complete="true" @click="articleDetails(item.id, item.user_id)" v-for="item in data.lists">
              <el-tag v-if="showTag" size="mini" style="width: min-content;position: absolute;top: 20px;right:20px;">{{item.tag_name}}</el-tag>
              <h2 class="title title--preview" style="font-size: 1.5em">{{item.title}}</h2>
              <div class="loader"></div>
              <span class="category">{{item.avatar_name}}</span>
              <div class="meta meta--preview">
                  <img class="meta__avatar" :src="item.avatar_img"/>
                  <span class="meta__date"><i class="fa fa-calendar-o"></i>{{item.localData}}</span>
                  <span class="meta__reading-time"><i class="fa fa-clock-o"></i>{{item.localTime}}</span>
              </div>
          </a>
          <footer class="page-meta">
            <span @click="$emit('load-more')" v-if="data.loadMoreBtn">
              <i class="fa fa-arrow-circle-o-down"></i>&nbsp;&nbsp;&nbsp;
              加载更多
            </span>
            <span v-else>我是有底线的...</span>
          </footer>
        </section>
      </transition>
      <section class="content_me">
          <div class="scroll-wrap" @scroll="scrollWrapHandle($event)" ref="scrollWrap">
              <article class="content__item" v-for="item in data.lists">
                  <h2 class="title title--full" :class="{'title-fix': scrollRange > 80 && data.marginTop, 'title-fix1': scrollRange > 80 && !data.marginTop }" style="font-size: 1.5em;">{{item.title}}</h2>
                  <div class="meta meta--full">
                      <img class="meta__avatar" :src="item.avatar_img"/>
                      <span class="meta__author" :class="{'meta__author-fix': scrollRange > 80 && data.marginTop, 'meta__author-fix1': scrollRange > 80 && !data.marginTop}">{{item.avatar_name}}</span>
                      <span class="meta__date"><i class="fa fa-calendar-o"></i>{{item.localData}}</span>
                      <span class="meta__reading-time"><i class="fa fa-clock-o"></i>{{item.localTime}}</span>
                  </div>
                  <p
                    class="articles_details"
                    v-if="item.id == operate.articleid && content.length"
                    ref="articles_details"
                  >
                    <mavon-editor
                      ref="mavon"
                      edit-preview="preview"
                      :toolbars-flag="false"
                      v-model="content"
                      :subfield="false"
                      default-open="preview"
                      preview-background="#fff"
                      :box-shadow="false"
                      :ishljs="true"
                      style="height: 100%; width: 100%;z-index: 1;"
                    />
                  </p>
                  <p v-else>
                    <aplaceholder></aplaceholder>
                  </p>
                  <acomment ref="comment" v-if="item.id == operate.articleid" :data="operate"></acomment>
              </article>
          </div>
          <aoperate ref="operate" :data="operate" @back-to-top="backToTop"></aoperate>
          <button class="close-button" @click="closeButton"><i class="fa fa-close"></i><span>Close</span></button>
      </section>
  </div>
</template>
<script>
  import 'highlight.js/styles/default.css'
  import hljs from 'highlight.js'
  import ClipboardJS from 'clipboard'
  import classie from 'src/common/js/classie.js'
  import Velocity from 'velocity-animate'
  import lazyloadimg from 'src/common/js/lazyloadimg.js'

  export default {
    props: {
      data: Object,
      showTag: Boolean
    },
    data() {
      return {
        top: 0,
        content: '',
        scrollRange: 0,
        titlePosition: 0,
        show: false,
        commentShow: false,
        operate: {
          mt: '',
          collected: 0,
          liked: 0,
          userid: this.getStorage('userid'),
          articleid: '',
          artUserid: ''
        }
      }
    },
    methods: {
      init(){
        const gridInit = require('../common/js/gridAnimate.js')
        gridInit.init()
      },
      articleDetails(id, user_id) {
        this.$emit('hidden-scroll')
        this.operate.articleid = id
        this.operate.artUserid = user_id
        this.$http.get('/get_article_details', {
          params: {
            id: id,
            userid: this.operate.userid
          }
        }).then(res => {
          if( res.status == 200 ) {
            this.content = res.data.data
            this.operate.collected = res.data.collected
            this.operate.liked = res.data.liked
            this.$nextTick(() => {
              lazyloadimg.init()
              // this.$refs.comment[0].get_comments()
            })
            this.codeFromat()
          }
          if (res.data.status == 500) {
            this.$notify({
              title:'error', message: res.data.message, type: 'error'
            });
          }
        })
      },
      closeButton(){
        this.$emit('show-scroll');
        this.content = '';
      },
      codeFromat(){
        this.$nextTick(() => {
          let codes = document.querySelectorAll('pre>code');
          for (let code of codes) {
            hljs.highlightBlock(code)
            this.codeView(code);
          }
        })
      },
      codeView(code){
        let type = code.getAttribute('data-code-type') || 'text';
        let div = document.createElement("div");
        div.setAttribute('class', 'codeView')

        let span = document.createElement("span");
        let node = document.createTextNode(type);
        span.setAttribute('class', 'codeType')

        let span1 = document.createElement("span");
        let node1 = document.createTextNode("全屏");
        span1.setAttribute('class', 'fullScreen fa fa-tv')

        let span2 = document.createElement("span");
        let node2 = document.createTextNode("复制");
        span2.setAttribute('class', 'copyCode fa fa-copy')

        span.appendChild(node)
        span1.appendChild(node1)
        span1.addEventListener('click', (e) => {
          this.fullScreen(e.target, classie.hasClass(e.target, 'open'))
        })
        span2.appendChild(node2)
        span2.addEventListener('click', (e) => {
          this.copyCode(e.target)
        })

        div.appendChild(span)
        div.appendChild(span1)
        div.appendChild(span2)
        code.before(div)

        //创建行数
        let lineHeight = Number(window.getComputedStyle(code, null).getPropertyValue('line-height').replace('px',''));
        let codeHeight = code.scrollHeight;
        let lineCounts = Math.floor( codeHeight / lineHeight );
        let div1 = document.createElement("div");
        div1.setAttribute('class', 'lineNum')
        for(let i=1; i<=lineCounts; i++){
          let span3 = document.createElement("span");
          let node3 = document.createTextNode(i);
          span3.appendChild(node3)
          div1.appendChild(span3)
          div1.style.lineHeight = lineHeight + 'px'
        }
        code.insertBefore(div1, null)
      },
      //复制
      copyCode(el){
        el.setAttribute('data-clipboard-text', el.parentNode.nextSibling.innerText)
        let clipboard = new ClipboardJS(el);
        clipboard.on('success', e => {
          this.$notify({
            title: 'Tips', message: '复制成功', type: 'success'
          });
          e.clearSelection();
          clipboard.destroy()
        })
      },
      //全屏
      fullScreen(el, isFullScreen){
        if(!isFullScreen) {
          classie.add(el, 'open')
          classie.add(el.parentNode.parentNode, this.data.marginTop ? 'full-screen-open' : 'full-screen-open1')
          classie.add(el.parentNode.nextSibling, 'full-code')
          classie.add(document.querySelector('.scroll-wrap'), 'noscroll')
          classie.add(el.parentNode.nextSibling.lastChild, 'full')
          classie.add(document.querySelector('.menu__handle'), 'full')
          classie.add(document.querySelector('.close-button'), 'full')
        } else {
          classie.remove(el, 'open')
          classie.remove(el.parentNode.parentNode, 'full-screen-open')
          classie.remove(el.parentNode.parentNode, 'full-screen-open1')
          classie.remove(el.parentNode.nextSibling, 'full-code')
          classie.remove(document.querySelector('.scroll-wrap'), 'noscroll')
          classie.remove(el.parentNode.nextSibling.lastChild, 'full')
          classie.remove(document.querySelector('.menu__handle'), 'full')
          classie.remove(document.querySelector('.close-button'), 'full')
        }
      },
      //滚动事件
      scrollWrapHandle(e){
        this.scrollRange = e.target.scrollTop
        //图标控制
        this.scrollRange > 100 ? this.$refs.operate.atTop() : this.$refs.operate.atBottom();
        //评论区出现在屏幕内加载评论
        //let scrollTop = document.querySelector('#comment-list-box').getBoundingClientRect().top;
        //if (scrollTop < 100 && !this.commentShow) {

          //this.commentShow = true
        //}
      },
      backToTop(){
        this.$refs.scrollWrap.scrollTo(0,0);
      },
      enter(el, done){
        for(let [index, grid] of this.grids.entries()) {
          Velocity(grid, { opacity: 1 }, { duration: 200, delay: 200*index,complete: (elements) => {
            elements[0].setAttribute('data-complete', false)
          }})
        }
      }
    },
    updated(){
      this.show = true
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
          this.grids = document.querySelectorAll('.grid__item[data-complete="true"]');

          this.enter()
          this.init()
        })
      },
      m(n, o){
        this.top = n;
        this.operate.mt = n;
      }
    }
  }
</script>
