<template>
    <div id="register" class="animate form">
      <form autocomplete="on" > 
          <h1> Sign up </h1> 
          <p> 
              <label for="usernamesignup" class="uname">Username</label>
              <div class="flex">
                <input id="usernamesignup" autocomplete="off" v-model="form.name" name="usernamesignup" required="required" type="text" />
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </div>
          </p>
          <p> 
              <label for="emailsignup" class="youmail"> Email</label>
              <div class="flex">
                <input id="emailsignup" autocomplete="off" v-model="form.email" name="emailsignup" required="required" type="email"/>
                <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
              </div> 
          </p>
          <p> 
              <label for="passwordsignup" class="youpasswd">Password </label>
              <div class="flex">
                <input id="passwordsignup" autocomplete="off" v-model="form.password" name="passwordsignup" required="required" type="password" />
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
              </div>
          </p>
          <p> 
              <label for="passwordsignup_confirm" class="youpasswd">Confirm Password </label>
              <div class="flex">
                <input id="passwordsignup_confirm" v-model="form.password_confirm" name="passwordsignup_confirm" required="required" type="password"/>
                <i class="fa fa-eye-slash" aria-hidden="true"></i>
              </div>
          </p>
          <p class="signin"> 
              <button type="button" class="button button--nina button--text-thick button--text-upper button--size-s" data-text="SignUp" @click="onSubmit" v-if="!loading">
                <span>S</span><span>i</span><span>g</span><span>n</span><span>U</span><span>p</span>
              </button>
              <button type="button" class="button icon-button button--size-s" v-else>
                <span class="icon icon-loading"></span>
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
        },
        loading: false,
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
            title:'Tips', message: '请输入长度为6-18的密码',type: 'info'
          });
          return;
        }

        this.loading = true
        this.$http.post('/register', {
          name: this.form.name,
          email: this.form.email,
          password: util.md5Encrypt(this.form.password),
          password_confirm: util.md5Encrypt(this.form.password_confirm)
        })
        .then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: 'Tips', message: res.data.message, type: 'success'
            });
            this.loading = res.loading
          } else {
            this.$notify({
              title:'error', message: res.message, type: 'error'
            });
            this.loading = false
          }
        })
      }
    }
  }
</script>
