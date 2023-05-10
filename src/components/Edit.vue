<template>
  <div>
    <div style="display: flex; align-items: center;white-space: nowrap;padding: 10px 20px;">
      <span style="font-size: 18px;color: #fff;">标题</span>
      &nbsp;&nbsp;&nbsp;
      <el-input v-model="title"></el-input>
      &nbsp;&nbsp;&nbsp;
      <button type="button" @click="saveContent" class="button button--nina button--text-thick" data-text="发布">
        <span>确定</span>
      </button>
    </div>
    <div style="display: flex; align-items: center;white-space: nowrap;padding: 10px 20px;">
      <span style="font-size: 18px;color: #fff;">标签</span>
      &nbsp;&nbsp;&nbsp;
      <el-radio v-model="tag" style="color: #fff;" v-for="item in tags" :label="item.tag_name" border>{{item.tag_name}}</el-radio>
    </div>
    <mavon-editor
      ref="mavon"
      v-model="value"
      preview-background="#fff"
      :box-shadow="false"
      :ishljs="true"
      style="height: calc(100vh - 130px);width: 100%;border-radius: 0;margin-top: 10px"
      @change="change"
    />
  </div>
</template>

<script>
  export default {
    props: {
      tags: Array
    },
    data() {
      return {
        title: '',
        tag: '',
        value: ''
      }
    },
    methods: {
      change(val) {
        this.value = val
      },
      saveContent(){
        if (!this.title || !this.tag || !this.value) {
          return this.$notify({
            title:'warning', message: '好好填表单', type: 'warning'
          })
        }
        this.$http.post('/save_content', {
          content: this.value,
          create_time: new Date().getTime(),
          update_time: new Date().getTime(),
          user_id: 'admin',
          avatar_name: 'parsonz',
          avatar_img: 'http://182.92.87.130/static/assets/avator.jpg',
          title: this.title,
          tag_name: this.tag
        }).then(res => {
          return res.data;
        }).then(res => {
          if(res.status == 200) {
            this.$notify({
              title:'success', message: res.message, type: 'success'
            });
            setTimeout(() => {
              document.location.reload()
            }, 1500)
          } else {
            this.$notify({
              title:'error', message: res.message, type: 'error'
            });
          }
        })
      }
    }
  }
</script>

<style>
</style>
