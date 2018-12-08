<template>
    <div id="login" class="animate form">
      <form autocomplete="on"> 
          <h1>Log in</h1>
          <p class="label-input"> 
              <label for="username" class="uname"> Username </label>
              <div class="flex">
                <input id="username" v-model="form.name" autocomplete="off" name="username" required="required" type="text"/>
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </div>
          </p>
          <p class="label-input"> 
              <label for="password" class="youpasswd"> Password </label>
              <div class="flex">
                <input id="password" name="password" v-model="form.password" required="required" type="password"/>
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
              </div>
          </p>
          <p class="login"> 
              <button type="button" class="button button--nina button--text-thick button--text-upper button--size-s" data-text="Login" @click="onSubmit" v-if="!loading">
                <span>L</span><span>o</span><span>g</span><span>i</span><span>n</span>
              </button>
              <button type="button" class="button icon-button button--size-s" v-else>
                <span class="icon icon-loading"></span>
              </button>
          </p>
          <p class="change_link">
              <a href="#toregister" class="to_register">Join us</a>
          </p>
      </form>
  </div>
</template>
<script>
  import util from '../common/util.js'
  import { mapActions, mapState } from 'vuex'

  export default {
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        loading: false,
        dialogObj: {
          title: '这是提交',
          message: 'naisdiasdijsld'
        }
      }
    },
    mounted(){
      
    },
    methods: {
      onSubmit() {
        if (this.form.name == '') {
          this.$notify({
            title:'info', message: '名字不能为空',type: 'info'
          });
          return;
        }

        if (this.form.password == '') {
          this.$notify({
            title:'info', message: '密码不能为空',type: 'info'
          });
          return;
        }

        this.loading = true
        this.$http.post('/login', {
          name: this.form.name,
          password: util.md5Encrypt(this.form.password)
        })
        .then(res => {
          if (res.data.status == 200) {
            //登录成功
            this.login(res.data.info.id) //提交登录actions
            this.$notify({
              title: 'Tips', message: res.data.message, type: 'success'
            });
            this.loading = res.loading
          } else {
            this.$notify({
              title:'error', message: res.data.message, type: 'error'
            });
            this.loading = false
          }
        })
      },
      ...mapActions([
        'login'
      ])
    }
  }
</script>

<style>
  #container{
      background: url('../common/img/3.jpg');
      background-size: cover;
      height: 100%;
      position: absolute;
      width: 100%;
      overflow: auto;
  }
  #wrapper{
      margin: 0px auto;   
      width: 28rem;
      position: relative; 
  }
  form a{
      color: rgb(95, 155, 198);
      text-decoration: underline;
  }
  form button:focus{
      background: rgb(97, 97, 97);
  }

  form h1{
      font-size: 48px;
      color: #4e4e4e;
      padding: 2px 0 10px 0;
      font-weight: bold;
      text-align: center;
  }
  /** For the moment only webkit supports the background-clip:text; */
  
  form h1:after{
      content: ' ';
      display: block;
      width: 100%;
      height: 2px;
      margin-top: 10px;
      background: linear-gradient(left, rgba(147,184,189,0) 0%,rgba(154, 161, 162, 0.8) 20%,rgba(46, 49, 49,1) 53%,rgba(154, 161, 162,0.8) 79%,rgba(147,184,189,0) 100%); 
  }

  form p.login,
  form p.signin{
    text-align: right;
    margin: 30px 0;
  }
  form p:first-child{
      margin: 0px;
  }
  form label{
      color: #505050;
      position: relative;
      font-weight: 600;
      letter-spacing: 1px;
      font-size: 1.2em;
  }

  /**** advanced input styling ****/
  /* placeholder */
  ::-webkit-input-placeholder  { 
      color: rgb(190, 188, 188); 
      font-style: italic;
  }
  input:-moz-placeholder,
  textarea:-moz-placeholder{ 
      color: rgb(190, 188, 188);
      font-style: italic;
  } 
  input {
    outline: none;
  }

  /* all the input except submit and checkbox */
  form input:not([type="checkbox"]){
      width: 100%;
      padding: 10px 5px 10px 50px;
      background: #fff; 
      border: 1px solid #fff;
      outline: none;
      -webkit-appearance: none;
  }
  form input:not([type="checkbox"]):focus{
    border: 1px solid rgb(78, 78, 78);
  }
  .fa::before{
    transition: .3s;
  }

  /** the magic icon trick ! **/
  [data-icon]:after {
      content: attr(data-icon);
      color: rgb(106, 159, 171);
      position: absolute;
      left: 10px;
      top: 35px;
      width: 30px;
  }

  /*styling both submit buttons */
  form p.button input{
      width: 20%;
      cursor: pointer;    
      background: rgb(97, 97, 97);
      padding: .2em .5em;
      color: #fff;
      font-size: 1.2em;    
      border: 1px solid rgb(178, 180, 181);
      outline: none;
  }
  form p.button input:hover{
      background: rgb(112, 122, 123);
  }

  p.login.button,
  p.signin.button{
      text-align: right;
      margin: 5px 0;
  }


  /* styling the checkbox "keep me logged in"*/
  .keeplogin{
      margin-top: -5px;
  }
  .keeplogin input,
  .keeplogin label{
      display: inline-block;
      font-size: 12px;    
      font-style: italic;
  }
  .keeplogin input#loginkeeping{
      margin-right: 5px;
  }
  .keeplogin label{
      width: 80%;
  }

  /*styling the links to change from one form to another */

  p.change_link{
      position: absolute;
      color: rgb(127, 124, 124);
      right: 30px;
      height: 20px;
      font-size: 16px ;
      margin: 0;
      text-align: right;
  }
  form>p{
      position: relative;
  }
  form>.flex .fa{
    position: absolute;
    width: 40px;
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: center;
    height: 100%;
    background: #4e4e4e;
    -webkit-transition: .2s;
    transition: .2s;
  }
  form p.change_link a {
      display: inline-block;
      font-weight: bold;
      padding: 2px 6px;
      margin-left: 10px;
      text-decoration: none;
      -webkit-transition: all 0.4s linear;
      -moz-transition: all 0.4s  linear;
      -o-transition: all 0.4s linear;
      -ms-transition: all 0.4s  linear;
      transition: all 0.4s  linear;
  }

  /** Styling both forms **/
  #register, 
  #login{
      position: absolute;
      width: 100%; 
      margin: 30px 0;
      padding: 18px 6% 50px 6%;
      background: rgb(247, 247, 247);
  }
  .form {
      transition: .3s;
  }
  .login-active,
  .register-active{
      transform: scale(.7);
  }
  @media screen and (max-width: 768px) {
      #wrapper{
          width: 100%;
      }
      #login, #register{
          box-shadow: none;
          background: none;
          border: none;
          transition: .3s;
          margin: 0;
      }
      #wrapper h1,#wrapper label,#wrapper a{
          color: #fff;
      }
      #wrapper h1{
        font-size: 2rem;
      }
  }
  #register{  
      z-index: 21;
      opacity: 0;
  }
  #login{
      z-index: 22;
  }
  #toregister:target ~ #wrapper #register,
  #tologin:target ~ #wrapper #login{
      z-index: 22;
      -webkit-animation-name: fadeInLeft;
      -moz-animation-name: fadeInLeft;
      -ms-animation-name: fadeInLeft;
      -o-animation-name: fadeInLeft;
      animation-name: fadeInLeft;
      -webkit-animation-delay: .1s;
      -moz-animation-delay: .1s;
      -o-animation-delay: .1s;
      -ms-animation-delay: .1s;
      animation-delay: .1s;
  }
  #toregister:target ~ #wrapper #login,
  #tologin:target ~ #wrapper #register{
      -webkit-animation-name: fadeOutLeft;
      -moz-animation-name: fadeOutLeft;
      -ms-animation-name: fadeOutLeft;
      -o-animation-name: fadeOutLeft;
      animation-name: fadeOutLeft;
  }

  .animate{
      -webkit-animation-duration: 0.5s;
      -webkit-animation-timing-function: ease;
      -webkit-animation-fill-mode: both;
      
      -moz-animation-duration: 0.5s;
      -moz-animation-timing-function: ease;
      -moz-animation-fill-mode: both;
      
      -o-animation-duration: 0.5s;
      -o-animation-timing-function: ease;
      -o-animation-fill-mode: both;
      
      -ms-animation-duration: 0.5s;
      -ms-animation-timing-function: ease;
      -ms-animation-fill-mode: both;
      
      animation-duration: 0.5s;
      animation-timing-function: ease;
      animation-fill-mode: both;
  }
</style>