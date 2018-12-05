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
                <button type="button" class="button button--nina button--text-thick" data-text="编辑">
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
                    <li class="pricing__feature">vue组件传值（一）：父组件向子组件传值</li>
                    <li class="pricing__feature">vue组件传值（一）：父组件向子组件传值</li>
                </ul>
                <button type="button" class="button button--nina button--text-thick" data-text="查看更多">
                  <span>查</span><span>看</span><span>更</span><span>多</span>
                </button>
            </div>
            <div class="pricing__item">
              <div class="icon icon--home"><i class="fa fa-fw fa-external-link"></i></div>
                <h3 class="pricing__title" style="margin-bottom: 0;">我的标签</h3>
                <ul class="pricing__tag-list">
                    <li class="pricing__feature">javascript</li>
                    <li class="pricing__feature">javascript</li>
                    <li class="pricing__feature">javascript</li>
                    <li class="pricing__feature">javascript</li>
                </ul>
                <button type="button" class="button button--nina button--text-thick" data-text="编辑">
                  <span>编</span><span>辑</span>
                </button>
            </div>
      </div>
      <ausercenter :data="userinfo"></ausercenter>
    </section>
</template>
<script>
  import util from '../common/util'

  export default {
    data() {
      return {
        userinfo: {}
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
        transition: all .3s;

        &:hover{
          background: linear-gradient(to bottom, rgba(158, 158, 158, 0.7) 0%, rgba(88, 88, 88, 0.58) 100%);
          box-shadow: 0px 0px 2px 0px #a7a4a4;
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
            width: 100%;
            overflow: hidden;
            font-size: .8em;
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
            background: #6f6f6f;
            width: 50%;
            margin: 0.5em 0;
            text-transform: uppercase;
            padding: 0.4em 0.2em;
            font-size: .8em;
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
  	.pricing-section{
  		padding: 5em 0;
  	}
    .pricing-section .pricing--rabten .pricing__item:nth-child(2){
      border: none;
    }
    .pricing-section .pricing--rabten .pricing__item{
      min-height: 75vh;
      border-bottom: 1px solid #8e8b8b;
    }
    .pricing-section .pricing--rabten .pricing__item:hover{
      background: none;
    }
  }

</style>

