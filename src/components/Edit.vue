<template>
  <div>
    <div style="display: flex; align-items: center;white-space: nowrap;padding: 10px 20px;">
      <span style="font-size: 18px;color: #fff;">文章标题</span>
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
      &nbsp;&nbsp;&nbsp;
      <el-date-picker
        v-model="create_time"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="创建日期"
      >
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;
      <el-date-picker
        v-model="update_time"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="更新日期"
      >
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;
      <a href="article.html">去查看列表</a>
      &nbsp;&nbsp;&nbsp;
      <el-input placeholder="" v-model="id" style="width: 150px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
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
        id: '',
        tag: 'javascript',
        value: '',
        create_time: null,
        update_time: null
      }
    },
    methods: {
      clickViewList() {
        window.open(`${window.location.host}/article.html`)
      },
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
          content: encodeURI(this.value),
          create_time: this.create_time ? new Date(this.create_time).getTime() : new Date().getTime(),
          update_time: this.update_time ? new Date(this.update_time).getTime() : new Date().getTime(),
          user_id: 'admin',
          avatar_name: 'parsonz',
          avatar_img: 'http://182.92.87.130/static/assets/avator.jpg',
          title: this.title,
          tag_name: this.tag,
          id: this.id
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
      },
      handleSearch() {
        if (!this.id) return
        this.$http.get('/get_article_by_id', {
          params: {
            id: this.id
          }
        }).then(res => res.data).then(res => {
          if (res.status === 200) {
            this.title = res.data.title
            this.tag = res.data.tag_name,
            this.value = decodeURI(res.data.content),
            this.create_time = new Date(Number(res.data.create_time)),
            this.update_time = new Date(Number(res.data.update_time))
          }
        })
      }
    }
  }
</script>

<style>
</style>
