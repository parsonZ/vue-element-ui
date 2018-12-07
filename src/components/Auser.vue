<template>
  <section class="pricing-section bg-10">
      <div class="pricing pricing--rabten">
          <div class="pricing__item">
            <div class="icon icon--home"><i class="fa fa-universal-access"></i></div>
            <h3 class="pricing__title">个人信息</h3>
                <div class="pricing__price">
                    <span>
                      <img :src="userinfo.avatar_img">
                    </span>
                </div>
                <ul class="pricing__feature-list">
                    <li class="pricing__feature">{{userinfo.avatar_name}}</li>
                    <li class="pricing__feature">
                      上次登录：
                      {{new Date(userinfo.create_time).toLocaleDateString()}}
                      {{new Date(userinfo.create_time).toLocaleTimeString()}}
                    </li>
                </ul>
                <button type="button" @click="edit($event,1)" class="button button--nina button--text-thick" data-text="编辑">
                  <span>编</span><span>辑</span>
                </button>
           	</div>
            <div class="pricing__item">
              <div class="icon icon--home"><i class="fa fa-fw fa-book"></i></div>
                <h3 class="pricing__title">我的文章</h3>
                <div class="pricing__price">
                  <span>
                    <i class="fa fa-thumbs-up"></i>
                    <i class="fa fa-star"></i>
                  </span>
                  <span class="pricing__anim pricing__anim--1">
                    <i>9</i>
                    <i>9</i>
                  </span>
                </div>
                <ul class="pricing__feature-list">
                    <li class="pricing__feature">父组件向子组件传值</li>
                    <li class="pricing__feature">父组件向子组件传值</li>
                </ul>
                <button @click="edit($event, 2)" type="button" class="button button--nina button--text-thick" data-text="查看更多">
                  <span>查</span><span>看</span><span>更</span><span>多</span>
                </button>
            </div>
            <div class="pricing__item">
              <div class="icon icon--home"><i class="fa fa-fw fa-tags"></i></div>
                <h3 class="pricing__title" style="margin-bottom: 0;">我的标签</h3>
                <ul class="pricing__tag-list">
                  <li class="pricing__feature" v-for="tag in userinfo.tags">
                    <i class="fa fa-fw fa-tag"></i>
                    {{tag.tag_name}}
                  </li>
                </ul>
                <button @click="edit($event,3)" type="button" class="button button--nina button--text-thick" data-text="编辑">
                  <span>编</span><span>辑</span>
                </button>
            </div>
      </div>
      <transition
        @enter="enter"
        @leave="leave"
        @before-enter="beforeEnter"
      >
        <div class="edit-wrapper" v-if="editshow">
          <div v-if="type == 1" class="edit-content">
            <editusers :userinfo="userinfo"></editusers>
            <div class="edit-footer">
              <button type="button" @click="updateUsers" class="button button--nina button--text-thick" data-text="update">
                <span>更</span><span>新</span>
              </button>
              <button type="button" class="button button--nina button--text-thick" data-text="close" @click="editshow = false">
                <span>关</span><span>闭</span>
              </button>
            </div>
          </div>
          <div v-if="type == 3" class="edit-content">
            <edittags :tags="allTags" @operate-tags="operateTags"></edittags>
            <div class="edit-footer">
              <button type="button" @click="updateTags" class="button button--nina button--text-thick" data-text="update">
                <span>更</span><span>新</span>
              </button>
              <button type="button" class="button button--nina button--text-thick" data-text="close" @click="editshow = false">
                <span>关</span><span>闭</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
      <ausercenter :data="userinfo"></ausercenter>
  </section>
</template>
<script>
  import util from '../common/util'
  import Velocity from 'velocity-animate'

  export default {
    data() {
      return {
        userinfo: {},
        editshow: false,
      }
    },
    mounted(){
      this.getUserInfo()
    },
    methods: {
      getUserInfo(){
        this.$http.get('/get_user_info', { params:{
          id: util.getStorage('userid')
        } }).then(res => {
          this.userinfo = res.data.userinfo
        })
      },
      edit(e, type) {
        this.type = type
        if(type == 1){
          this.editshow = true
        } else {
          if(type == 3){
            this.getAlltags().then(() => {
              this.editshow = true
            })
          }
        }
      },
      getAlltags(){
        this.$store.dispatch('openLoading')
        return this.$http.get('/get_tags', {}).then(res => {
          this.$store.dispatch('closeLoading')
          this.allTags = res.data.list

          this.allTags.map(item => {
            this.userinfo.tags.map(item1 => {
              if(item1.tag_id == item.tag_id){
                item['isCheck'] = true
              }
            })
            return item;
          })
        })
      },
      updateUsers(){
        this.$http.get('/update_users', {
          params: {
            userinfo: this.userinfo
          }
        }).then(res => {
          conosle.log(res)
        })
      },
      operateTags(data){
        this.allTags.map(item => {
          if(item.tag_id == data.id) {
            item['isCheck'] = data.type == 'add' ? true : false;
          }
        })
      },
      updateTags(){
        let ids = [];
        this.allTags.find(item => {
          if(item.isCheck){
            ids.push(item.tag_id)
          }
        })

        this.$http.get('/update_tags', {
          params: {
            ids: ids.join(','),
            userid: this.userinfo.id
          }
        }).then(res => {
          this.$notify({
            title: 'Tips',
            message: res.data.message,
            type: 'success'
          })
          this.getUserInfo()
        })
      },
      beforeEnter(el){
        document.body.style.overflow = 'hidden'
      },
      enter(el, done) {
        Velocity(el, { opacity: 1, width: '100%' },{ duration: 300 })
        Velocity(document.querySelector('.edit-content'), { opacity: 1 },{ duration: 300, delay: 300, complete: done })
      },
      leave(el, done) {
        Velocity(document.querySelector('.edit-content'), { opacity: 0 },{ duration: 300 })
        Velocity(el, { opacity: 0, width: '0px' },{ duration: 300, delay: 300, complete: done })
        document.body.style.overflow = 'auto'
      }
    }
  }
</script>
<style scoped lang="less">
  .pricing-section {
  	min-height: 100vh;
  	display: flex;
    align-items: center;
    justify-content: center;

  	.pricing {
  	  display: flex;
  		flex-wrap: wrap;
  		justify-content: center;
      height: 100vh;
  	}

  	.pricing--rabten{
  		.pricing__item {
  			position: relative;
  			display: flex;
  			flex-direction: column;
  			align-items: stretch;
  			text-align: center;
  			padding: 5em 4em;
  			color: #fff;
        min-width: 26em;
        max-width: 26em;
        min-height: 500px;
        transition: all .3s;

        &:focus{
          outline: none;
        }

        &:hover{
          background: #383434;
          cursor: pointer;
        }

  			.pricing__title {
  			  font-size: 1.2em;
          font-weight: normal;
  			 }

  			.icon {
  			  font-size: 2.5em;
  			  color: #8b909d;
  			  transition: color 0.3s;
  			}

  			.pricing__price {
			  	font-size: 2.5em;
			  	font-weight: bold;
			  	overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 3em;

          img{
            width: 2em;
            height: 2em;
            border-radius: 50%;
          }
          >span{
            display: flex;
            flex-direction: column;
            >i{
              margin: .1em .2em;
            }
          }
			  }

			  .pricing__anim {
			  	display: inline-block;
			  	position: relative;
			  }
			  .pricing__feature-list {
			  	font-size: 1.2em;
          margin-top: 1em;
          padding: 0;
          list-style: none;
          text-align: center;
          color: #fff;
          line-height: 2;

          .pricing__feature{
            white-space: nowrap;
            width: 70%;
            margin: 0 auto;
            overflow: hidden;
            font-size: 0.8em;
            text-overflow: ellipsis;
          }
			  }

        .pricing__tag-list{
          list-style: none;
          padding: 0;
          line-height: 1.5;
          font-size: 1.2em;
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-bottom: 1.8em;

          li{
            border: 1px solid #fff;
            width: 70%;
            border-radius: 0.2em;
            margin: 0.5em 0;
            text-transform: uppercase;
            padding: 0.4em 1em;
            font-size: 0.8em;
            text-align: left;
          }
        }

        button{
          position: absolute;
          bottom: 5em;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
        }
  		}

  		.pricing__item:nth-child(2) {
		  	border-right: 1px solid rgba(139, 144, 157, 0.18);
		  	border-left: 1px solid rgba(139, 144, 157, 0.18);
		  }
  	}
  }

  .pricing--rabten .pricing__item:hover .pricing__anim {
  	animation: moveUp 0.4s forwards;
  	animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  }

  @keyframes moveUp {
  	50% {transform: translate3d(0,-100%,0); }
  	51% { opacity: 0;transform: translate3d(0,-100%,0); }
  	52% { opacity: 1; transform: translate3d(0,100%,0); }
  	100% { transform: translate3d(0,0,0); }
  }

  @media screen and (max-width: 60em) {
    .pricing-section .pricing--rabten .pricing__item:nth-child(2){
      border: none;
      padding: 7em 0;
    }
    .pricing-section .pricing--rabten .pricing__item{
      height: 100vh;
      border-bottom: 1px solid #8e8b8b !important;
    }
    .pricing-section .pricing--rabten .pricing__item:hover{
      background: none;
    }

    .pricing-section .pricing--rabten .pricing__item button{
      bottom: 7em;
    }
    .edit-wrapper .edit-content{
      width: 100% !important;
    }
    .pricing-section .pricing--rabten .pricing__item .pricing__title{
      letter-spacing: 1em;
    }
  }

  .edit-wrapper{
    position: fixed;
    width: 0;
    height: 100%;
    top: 0;
    background: linear-gradient(to bottom, rgb(158, 158, 158) 0%, rgb(88, 88, 88) 100%);
    z-index: 1;
    opacity: 0;
    overflow-y: auto;

    .edit-footer{
      text-align: center;
      margin-top: 4em;
    }

    .edit-content{
      padding: 5em 0;
      width: 65%;
      margin: 0 auto;
      color: #fff;
      opacity: 0;
    }
  }
</style>

