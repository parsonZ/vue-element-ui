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
          <p class="login button"> 
              <input type="button" @click="onSubmit" value="Login" /> 
          </p>
          <p class="change_link">
              <!-- Not a member yet ? -->
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
