<template>
  <el-container>
    <el-row>
      <el-col :sm="8" :xs="18">
        <el-form class="myform" status-icon ref="form" :model="form" :rules="rules" label-width="80px" size="middle">
          <el-form-item label="用户名" prop="name" >
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">登录</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {

        this.$refs[formName].validate(valid => {
          if(valid) {
            this.$http.post('/login', this.form)
            .then(res => {
              return res.data;
            })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  message: '成功',type: 'success'
                });
              } else {
                this.$message({
                  message: res.message,type: 'error'
                });
              }
            })
          } else {
            return false;
          }
        })
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  .myform{
    padding: 3vw 8vw 1.5vw 5vw;
    background: rgba(255, 255, 255, 0.32);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .myform label{
    color: #fff !important;
  }
</style>