<template>
  <div id="comment-list-box">
    <div class="title">评论</div>
    <div class="comment-form">
      <div class="avatar-box">
        <i class="fa fa-user-circle-o"></i>
      </div>
      <div class="form-box">
        <input placeholder="placeholder" class="comment-box" @blur="isfocus = value.length ? true : false" @focus="isfocus = true" v-model="value">
      </div>
    </div>
    <div class="submit" v-if="isfocus">
      <button type="button" @click="submitComment('respAuthor')" class="button button--nina button--text-thick button--size-s" data-text="评论">
        <span>评</span><span>论</span>
      </button>
    </div>
    <div class="comment-box">
      <div class="comment-item" v-for="(item, index) in comments">
        <div class="comment-header">
          <img :src="item.fromUser.avatar_img">
          <div><span class="resp">{{item.fromUser.id == data.artUserid ? '作者' : item.fromUser.avatar_name}}</span></div>
        </div>
        <div class="comment-body">
          {{item.content}}
        </div>
        <div class="comment-footer">
          <div>
            {{new Date(item.create_time).toLocaleDateString()}}
            {{new Date(item.create_time).toLocaleTimeString()}}
          </div>
          <div>
            <i class="fa fa-thumbs-o-up fa-lg" 
              @click="commentLike($event, item)" 
              :class="{'fa-active': item.isLiked}"
              :data-id="item.c_id"></i>{{item.like_count}}
            <i class="fa fa-comments-o fa-lg"
              @click="commentResp(item)" 
              :data-id="item.c_id"></i>{{item.resp_count}}   
          </div>
        </div>
        <div class="form-box" v-if="item.showForm">
          <input :placeholder="'回复:'+item.fromUser.avatar_name" @blur="item.showForm = item.value.length" class="comment-box" ref="commentInput" v-model="item.value">
          <button type="button" @click="submitComment('respComment', item, item, index)" class="button button--nina button--text-thick button--size-s" data-text="评论">
            <span>评</span><span>论</span>
          </button>
        </div>

        <div class="comment-topcomment" v-if="item.topComments" v-for="(topc, topi) in item.topComments">
          <div class="comment-header">
            <img :src="topc.fromUser.avatar_img">
            <div><span class="resp">{{topc.fromUser.id == data.artUserid ? '作者' : topc.fromUser.avatar_name}}</span></div>
          </div>
          <div class="comment-body">
            回复@<span class="resp">{{topc.toUser.id == data.artUserid ? '作者' : topc.toUser.avatar_name}}</span>：{{topc.content}}
          </div>
          <div class="comment-footer">
            <div>
              {{new Date(topc.create_time).toLocaleDateString()}}
              {{new Date(topc.create_time).toLocaleTimeString()}}</div>
            <div>
              <i class="fa fa-thumbs-o-up fa-lg" 
                @click="commentLike($event, topc)" 
                :class="{'fa-active': topc.isLiked}"
                :data-id="topc.c_id"></i>{{topc.like_count}}
              <i class="fa fa-comments-o fa-lg"
                @click="commentResp(topc)" 
                :data-id="topc.c_id"></i>{{topc.resp_count}}
            </div>
          </div>
          <div class="form-box" v-if="topc.showForm">
            <input :placeholder="'回复:'+topc.fromUser.avatar_name" @blur="topc.showForm = topc.value.length" class="comment-box" ref="commentInput" v-model="topc.value">
            <button type="button" @click="submitComment('respComment', topc, item, topi)" class="button button--nina button--text-thick button--size-s" data-text="评论">
              <span>评</span><span>论</span>
            </button>
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
      submitComment(type, comment = false, item = false, index = false){
        let params;
        if (type == 'respAuthor') {
          params = {
            targetid: this.data.articleid,
            userid: this.data.userid,
            artUserid: this.data.artUserid,
            comment: this.value
          }
        } else {
          params =  {
            targetid: this.data.articleid,
            userid: this.data.userid,
            artUserid: comment.from_id,
            comment: comment.value,
            parentid: item.c_id,
            tocid: comment.c_id
          }
        }

        this.$http.get('/comments/add', {
          params
        }).then(res => {
          if (res.data.status == 200) {
            if (type == 'respAuthor') {
              this.comments.push(res.data.current)
            } else {
              if (comment.topComments) {
                comment.topComments.splice(index+1, 0, res.data.current)
              } else {
                item.topComments.splice(index+1, 0, res.data.current)
              }
              item.resp_count ++
              comment.value = ''
              comment.showForm = false
            }
          }
        })
      },
      commentLike(e, item){
        let params = {
          respuserCid: e.target.dataset.id,
          userid: this.data.userid,
          otype: item.isLiked ? 0 : 1
        }
        this.$http.get('/comments/comment_like_upd', { params }).then(res => {
          this.$notify({
            message: res.data.message,
            title: 'Tips',
            type: res.data.status == 200 ? 'success' : 'error'
          })
        })
        item.isLiked ? item.like_count -- : item.like_count ++
        item.isLiked = !item.isLiked
      },
      commentResp(item) {
        item.showForm = !item.showForm
        item.value = ''
        this.$nextTick(() => {
          if(item.showForm) {
            
          }
        })
      },

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
    }

    .submit{
      text-align: right;
      background: #fafbfc;
      padding: 0 2em 1em 0;

      button{
        font-size: .8em;
        background: #2196f3;
      }
    }
    .form-box{
      width: 100%;
      .comment-box{
        border: 1px solid #ddd;
        height: 2.5em;
        line-height: 2.5em;
        padding: 3px 10px;
        width: 100%;
        color: #5a5a5a;

        &:focus{
          border: 1px solid #2196f3;
        }
      }
    }
    .comment-box{
      padding: 1em;
      .form-box{
        margin: 1em 3.5em;
        padding: 1em;
        display: flex;
        background: #fafbfc;

        button{
          font-size: .7em;
          background: #2196f3;
        }
      }

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
          .fa-active{
            color: #2196f3;
          }
        }

        .comment-topcomment{
          padding-left: 3em;
        }
      }
    }
  }
</style>

