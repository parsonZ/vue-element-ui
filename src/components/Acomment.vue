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
      <button type="button" @click="submitComment" class="button button--nina button--text-thick button--size-s" data-text="评论">
        <span>评</span><span>论</span>
      </button>
    </div>
    <div class="comment-box">
      <div class="comment-item" v-for="item in comments">
        <div class="comment-header">
          <img :src="item.fromUser.avatar_img">
          <div><span class="resp">{{item.fromUser.id == data.artUserid ? '作者' : item.fromUser.avatar_name}}</span></div>
        </div>
        <div class="comment-body">
          {{item.content}}
        </div>
        <div class="comment-footer">
          <div>{{new Date(item.create_time).toLocaleTimeString()}}</div>
          <div>
            <i class="fa fa-thumbs-o-up fa-lg"></i>
            <i class="fa fa-comments-o fa-lg"></i>
          </div>
        </div>

        <div class="comment-topcomment" v-if="item.topComments" v-for="topc in item.topComments">
          <div class="comment-header">
            <img :src="topc.fromUser.avatar_img">
            <div><span class="resp">{{topc.fromUser.id == data.artUserid ? '作者' : topc.fromUser.avatar_name}}</span></div>
          </div>
          <div class="comment-body">
            回复@<span class="resp">{{topc.toUser.id == data.artUserid ? '作者' : topc.toUser.avatar_name}}</span>：{{topc.content}}
          </div>
          <div class="comment-footer">
            <div>{{new Date(topc.create_time).toLocaleTimeString()}}</div>
            <div>
              <i class="fa fa-thumbs-o-up fa-lg"></i>
              <i class="fa fa-comments-o fa-lg"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        placeholder: '请输入评论',
        value: '',
        isfocus: false,
        comments: []
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
      },
      get_comments(){
        this.$http.get('/comments/lists', {
          params: {
            targetid: this.data.articleid,
            userid: this.data.userid,
            artUserid: this.data.artUserid
          }
        }).then(res => {
          this.comments = res.data.comments
        })
      },
      submitComment(){
        this.$http.get('/comments/add', {
          params: {
            targetid: this.data.articleid,
            userid: this.data.userid,
            artUserid: this.data.artUserid,
            comment: this.value
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.comments.push(res.data.current)
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
  #comment-list-box{
    position: relative;
    background-color: #fff;
    max-width: 960px;
    margin: 3em auto;

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
      padding: 1em;
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

    .comment-box{
      padding: 1em;

      .comment-item{
        margin: 10px 0;
        .comment-header{
          display: flex;
          align-items: center;

          img{
            width: 2em;
            height: 2em;
            border-radius: 50%;
            margin-right: 1em;
          }
        }
        .comment-body{
          padding: 0.5em 3.5em;
        }
        .resp{
          color: #2196f3;
          margin: 0 .3em;
          cursor: pointer;
        }
        .comment-footer{
          margin: 0.5em 3.5em;
          margin-right: 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f1f1f1;
          padding-bottom: 1em;
          color: #ababab;

          .fa{
            margin: 0 .5em;
            cursor: pointer;
            font-size: 1.2em;
            transition: .2s;
            &:hover{
              color: #2196f3;
            }
          }
        }

        .comment-topcomment{
          padding-left: 3em;
        }
      }
    }
  }
</style>

