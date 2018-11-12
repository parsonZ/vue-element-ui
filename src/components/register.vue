<template>
    <div>
      <form autocomplete="on"> 
          <h1> Sign up </h1> 
          <p> 
              <label for="usernamesignup" class="uname">Your username</label>
              <i class="fa fa-user-o" aria-hidden="true"></i>
              <input id="usernamesignup" v-model="form.name" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
          </p>
          <p> 
              <label for="emailsignup" class="youmail"> Your email</label>
              <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
              <input id="emailsignup" v-model="form.email" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/> 
          </p>
          <p> 
              <label for="passwordsignup" class="youpasswd">Your password </label>
              <i class="fa fa-eye-slash" aria-hidden="true"></i>
              <input id="passwordsignup" v-model="form.password" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
          </p>
          <p> 
              <label for="passwordsignup_confirm" class="youpasswd">Please confirm your password </label>
              <i class="fa fa-eye-slash" aria-hidden="true"></i>
              <input id="passwordsignup_confirm" v-model="form.password_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
          </p>
          <p class="signin button"> 
              <input type="button" @click="onSubmit" value="Sign up"/> 
          </p>
          <p class="change_link">  
              Already a member ?
              <a href="#tologin" class="to_register"> Go and log in </a>
          </p>
      </form>
  </div>
</template>
<script>
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
        this.$http.post('/register', this.form)
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
