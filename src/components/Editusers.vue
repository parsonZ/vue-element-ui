<template>
  <div class="editusers">
    <div class="left">
      <div>
        <input v-model="userinfo.avatar_name">
        <label>
          <i class="fa fa-fw fa-user-o icon"></i>
          <span>昵称</span>
        </label>
      </div>
      <div>
        <input v-model="userinfo.username">
        <label>
          <i class="fa fa-fw fa-user-o icon"></i>
          <span>用户名</span>
        </label>
      </div>
      <div>
        <input v-model="userinfo.password" type="password">
        <label>
          <i class="fa fa-fw fa-eye-slash icon"></i>
          <span>密码</span>
        </label>
      </div>
      <div>
        <input v-model="userinfo.confirm_password" type="password">
        <label>
          <i class="fa fa-fw fa-eye-slash icon"></i>
          <span>确认</span>
        </label>
      </div>
      <div>
        <input v-model="userinfo.email">
        <label>
          <i class="fa fa-fw fa-envelope-o icon icon--kohana"></i>
          <span>邮箱</span>
        </label>
      </div>
    </div>
    <div class="right">
      <img :src="userinfo.avatar_img">
      <div class="upload">
        <button type="button" class="button button--nina button--text-thick" data-text="upload">
          <span>上</span><span>传</span>
          <input id="file" ref="inputer" name="uploadfile" type="file" @change="uploadImg">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate'
  import classie from 'src/common/js/classie.js'
  import util from 'src/common/util.js'
  export default {
    props: {
      userinfo: Object
    },
    data() {
      return {}
    },
    methods: {
      uploadImg(){
        let fileData = new FormData();
        fileData.append("file", this.$refs.inputer.files[0]);
        
        util.uploadImg(this.$http, fileData).then(res => {
          this.$notify({
            title: 'Tips',
            message: res.data.message,
            type: res.data.status == 200 ? 'success' : 'error'
          })
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .editusers{
    display: flex;
    padding: 0 10em;
    flex-direction: row-reverse;

    .left{
      margin-top: 2em;
      width: 100%;

      >div{
        position: relative;
        display: flex;
        align-items: center;
        font-size: .8em;

        input{
          height: 3em;
          margin: 0.8em 0;
          padding: 0 0.5em;
          padding-left: 4.5em;
          color: #fff;
          width: 100%;
          border: none;
          outline: none;
          background: #4e4e4e;
          
          &:focus ~ label{
            .icon {
              left: 24%;
              color: #007bfd;
              opacity: 1;
            }

            span{
              left: 100%;
              opacity: 0;
            }
          }
        }

        label{
          position: absolute;
          padding-right: .5em;
          color: #ddd;
          overflow: hidden;
          display: flex;
          align-items: center;
          outline: none;
          height: 100%;
          width: 4em;

          .icon{
            position: absolute;
            left: -2em;
            transition: .2s;
            font-size: 1.5em;
            opacity: 0;
          }

          span{
            transition: 0.3s;
            position: relative;
            left: 0;
            display: block;
            width: 100%;
            text-align: right;
          }
        }
      }
    }

    img{
      width: 7em;
      height: 7em;
      border-radius: 50%;
    }

    .right{
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      line-height: 6;
      margin-top: 2em;
    }

    button{
      position: relative;

      input[type="file"]{
        width: 100%;
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        height: 100%;
        opacity: 0;
      }
    }
  }

  @media screen and (max-width: 50em){
    .editusers{
      flex-direction: column;
      padding: 0;
    }
    .editusers .left > div{
      width: 70%;
      margin: 0 auto;
    }
  }
</style>