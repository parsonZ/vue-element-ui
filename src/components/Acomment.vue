<template>
  <div id="comment-list-box">
    <div class="title">评论</div>
    <div class="comment-form">
      <div class="avatar-box">
        <i class="fa fa-user-circle-o"></i>
      </div>
      <div class="form-box">
        <input placeholder="placeholder" class="comment-box" @blur="inputBlur" @focus="inputFocus" v-model="value">
      </div>
    </div>
    <div class="submit" v-if="isfocus">
      <button type="button" class="button button--nina button--text-thick button--size-s" data-text="评论">
        <span>评</span><span>论</span>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        placeholder: '请输入评论',
        value: '',
        isfocus: false
      }
    },
    methods: {
      inputFocus(){
        this.isfocus = true
      },
      inputBlur(){
        if (this.value == '') {
          this.isfocus = false
        }
      }
    }
  }
</script>
<style scoped lang="less">
  #comment-list-box{
    position: relative;
    background-color: #fff;
    font-size: 14px;
    max-width: 1200px;
    margin: 0 auto;

    .title{
      color: #8a9aa9;
      font-size: 1.5em;
      font-weight: 400;
      text-align: center;
      padding: 1.67rem 0 1em;
    }

    .comment-form{
      display: flex;
      align-items: center;
      padding: 1em 2em;
      background: #fafbfc;
      justify-content: left;

      .avatar-box {
        color: #2196f3;
        font-size: 1.8em;
        margin-right: .2em;
      }
      .form-box{
        width: 100%;
        .comment-box{
          border: 1px solid #ddd;
          height: 2.5em;
          line-height: 2.5em;
          padding: 3px 10px;
          border-radius: .2em;
          width: 100%;
          color: #5a5a5a;

          &:focus{
            border: 1px solid #2196f3;
          }
        }
      }
    }

    .submit{
      text-align: right;
      background: #fafbfc;
      padding: 0 2em 1em 0;

      button{
        font-size: .8em;
        background: #2196f3;
        border-radius: .3em;
      }
    }
  }
</style>

