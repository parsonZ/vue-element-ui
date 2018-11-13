<template>
    <div id="register" class="animate form">
      <form autocomplete="on" :class="{'login-active': this.$store.getters.getSidebarState.show}"> 
          <h1> Sign up </h1> 
          <p> 
              <label for="usernamesignup" class="uname">Your username</label>
              <div class="flex">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                <input id="usernamesignup" v-model="form.name" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
              </div>
          </p>
          <p> 
              <label for="emailsignup" class="youmail"> Your email</label>
              <div class="flex">
                <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                <input id="emailsignup" v-model="form.email" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/>
              </div> 
          </p>
          <p> 
              <label for="passwordsignup" class="youpasswd">Your password </label>
              <div class="flex">
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                <input id="passwordsignup" v-model="form.password" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
              </div>
          </p>
          <p> 
              <label for="passwordsignup_confirm" class="youpasswd">Please confirm your password </label>
              <div class="flex">
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                <input id="passwordsignup_confirm" v-model="form.password_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
              </div>
          </p>
          <p class="signin"> 
              <button class="button button--nina button--text-thick button--text-upper button--size-s" data-text="SignUp" @click="onSubmit">
                <span>S</span><span>i</span><span>g</span><span>n</span><span>U</span><span>p</span>
              </button>
          </p>
          <p class="change_link">  
              Already a member ?
              <a href="#tologin" class="to_register"> Go and log in </a>
          </p>
      </form>
  </div>
</template>
<script>
  import util from '../common/util.js';
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirm: ''
        } 
      }
    },
    methods: {
      onSubmit() {
        if (this.form.name == '') {
          this.$notify({
            title:'Tips', message: '名字不能为空',type: 'info'
          });
          return;
        }

        if (this.form.email == '') {
          this.$notify({
            title:'Tips', message: '邮箱不能为空',type: 'info'
          });
          return;
        }

        if (this.form.password == '') {
          this.$notify({
            title:'Tips', message: '密码不能为空',type: 'info'
          });
          return;
        }

        if ( this.form.password.length<6 || this.form.password.length>18) {
          this.$notify({
            title:'Tips', message: '请输入长度为6-18的字符',type: 'info'
          });
          return;
        }

        this.$http.post('/register', {
          name: this.form.name,
          email: this.form.email,
          password: util.md5Encrypt(this.form.password),
          password_confirm: util.md5Encrypt(this.form.password_confirm)
        })
        .then(res => {
          return res.data;
        })
        .then(res => {
          this.$notify({
            title: 'Tips', message: res.message, type: res.status == 200 ? 'success':'error'
          });
        })
      }
    }
  }
</script>
