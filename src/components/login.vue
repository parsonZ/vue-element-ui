<template>
    <div id="login" class="animate form">
      <form autocomplete="on" :class="{'login-active': this.$store.getters.getSidebarState.show}"> 
          <h1>Log in</h1> 
          <p> 
              <label for="username" class="uname"> Your email or username </label>
              <div class="flex">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                <input id="username" v-model="form.name" name="username" required="required" type="text" placeholder="myusername or mymail@mail.com"/>
              </div>
          </p>
          <p> 
              <label for="password" class="youpasswd"> Your password </label>
              <div class="flex">
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                <input id="password" name="password" v-model="form.password" required="required" type="password" placeholder="eg. X8df!90EO" />
              </div>
          </p>
          <p class="login"> 
              <button class="button button--nina button--text-thick button--text-upper button--size-s" data-text="Login" @click="onSubmit">
                <span>L</span><span>o</span><span>g</span><span>i</span><span>n</span>
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
  export default {
    data() {
      return {
        form: {
          name: '',
          password: ''
        }
      }
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
        
        this.$http.post('/login', {
          name: this.form.name,
          password: util.md5Encrypt(this.form.password)
        })
        .then(res => {
          return res.data;
        })
        .then(res => {
          if (res.status == 200) {
            this.$notify({
              title:'success', message: '登录成功',type: 'success'
            });
          } else {
            this.$notify({
              title:'error', message: res.message,type: 'error'
            });
          }
        })
      }
    }
  }
</script>

<style>
  /***login form **/
  #container{
      background: url('/static/img/3.jpg');
      background-size: cover;
      height: 100%;
      position: absolute;
      width: 100%;
      overflow: auto;
  }
  #wrapper{
      right: 0px;
      min-height: 560px;  
      margin: 0px auto;   
      width: 500px;
      position: relative; 
  }
  /**** Styling the form elements **/

  /**** general text styling ****/
  #wrapper a{
      color: rgb(95, 155, 198);
      text-decoration: underline;
  }
  form button:focus{
      background: rgb(97, 97, 97);
  }

  #wrapper h1{
      font-size: 48px;
      color: #4e4e4e;
      padding: 2px 0 10px 0;
      font-weight: bold;
      text-align: center;
      padding-bottom: 30px;
  }
  /** For the moment only webkit supports the background-clip:text; */
  #wrapper h1{
      
  }
  #wrapper h1:after{
      content: ' ';
      display: block;
      width: 100%;
      height: 2px;
      margin-top: 10px;
      background: -webkit-linear-gradient(left, rgba(147,184,189,0) 0%,rgba(154, 161, 162, 0.8) 20%,rgba(46, 49, 49,1) 53%,rgba(154, 161, 162,0.8) 79%,rgba(147,184,189,0) 100%); 
      background: -o-linear-gradient(left, rgba(147,184,189,0) 0%,rgba(154, 161, 162, 0.8) 20%,rgba(46, 49, 49,1) 53%,rgba(154, 161, 162,0.8) 79%,rgba(147,184,189,0) 100%); 
      background: -ms-linear-gradient(left, rgba(147,184,189,0) 0%,rgba(154, 161, 162, 0.8) 20%,rgba(46, 49, 49,1) 53%,rgba(154, 161, 162,0.8) 79%,rgba(147,184,189,0) 100%); 
      background: linear-gradient(left, rgba(147,184,189,0) 0%,rgba(154, 161, 162, 0.8) 20%,rgba(46, 49, 49,1) 53%,rgba(154, 161, 162,0.8) 79%,rgba(147,184,189,0) 100%); 
  }

  #wrapper p{
      margin-bottom:15px;
  }
  #wrapper p.login,
  #wrapper p.signin{
    text-align: right;
  }
  #wrapper p:first-child{
      margin: 0px;
  }
  #wrapper label{
      color: #505050;
      position: relative;
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
  #wrapper input:not([type="checkbox"]){
      width: 92%;
      margin-top: 4px;
      padding: 10px 5px 10px 32px;    
      border: 1px solid rgb(178, 178, 178);
      -webkit-appearance: textfield;
      -webkit-box-sizing: content-box;
        -moz-box-sizing : content-box;
             box-sizing : content-box;
      -webkit-border-radius: 3px;
         -moz-border-radius: 3px;
              border-radius: 3px;
      -webkit-box-shadow: 0px 1px 4px 0px rgba(168, 168, 168, 0.6) inset;
         -moz-box-shadow: 0px 1px 4px 0px rgba(168, 168, 168, 0.6) inset;
              box-shadow: 0px 1px 4px 0px rgba(168, 168, 168, 0.6) inset;
      -webkit-transition: all 0.2s linear;
         -moz-transition: all 0.2s linear;
           -o-transition: all 0.2s linear;
              transition: all 0.2s linear;
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
  #wrapper p.button input{
      width: 20%;
      cursor: pointer;    
      background: rgb(97, 97, 97);
      padding: .2em .5em;
      color: #fff;
      font-size: 1.2em;    
      border: 1px solid rgb(178, 180, 181);    
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }
  #wrapper p.button input:hover{
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
      text-align: right;
  }
  form>p{
      position: relative;
  }
  form>.flex .fa{
      position: absolute;
      left: 12px;
      margin-top: 2px;
  }
  #wrapper p.change_link a {
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
      top: 30px;
      width: 88%; 
      padding: 18px 6% 60px 6%;
      background: rgb(247, 247, 247);
      border: 1px solid #ddd;
      -webkit-box-shadow: 0pt 2px 5px rgba(105, 108, 109,  0.7),  0px 0px 8px 5px rgba(208, 223, 226, 0.4) inset;
         -moz-box-shadow: 0pt 2px 5px rgba(105, 108, 109,  0.7),  0px 0px 8px 5px rgba(208, 223, 226, 0.4) inset;
              box-shadow: 0pt 2px 5px rgba(105, 108, 109,  0.7),  0px 0px 8px 5px rgba(208, 223, 226, 0.4) inset;
      -webkit-box-shadow: 5px;
      -moz-border-radius: 5px;
           border-radius: 5px;
  }
  form {
      transition: .3s;
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
      }
      .login-active,
      .register-active{
          transform: translateX(120px) scale(.7);
      }
      #wrapper h1,#wrapper label,#wrapper a{
          color: #fff;
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



  /** the actual animation, credit where due : http://daneden.me/animate/ ***/
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