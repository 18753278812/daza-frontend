<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4>{{ data.title }}</h4>
        <div class="row">
          <div class="col-xs-12">
            <small class="text-muted">{{ data.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.published_at }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.view_count }}阅读</small>
          </div>
        </div>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <p>
          <div class="row">
            <div class="col-xs-12">
              <span v-for="tag in data.tags">
                <span class="tag tag-default">{{ tag.name }}</span>
              </span>
            </div>
          </div>
        </p>
        <div class="row">
          <div class="col-xs-6">
            <a href="#"><small class="text-muted">举报</small></a>
          </div>
          <div class="col-xs-6 text-xs-right">
            <a v-bind:href="data.link" target="_blank"><small class="text-muted">阅读原文</small></a>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-12">
            <p class="text-xs-left" v-if="comments.length > 0">{{ data.comment_count }}条精彩回复</p>
            <p class="text-xs-center" v-if="comments.length == 0">空空如也</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <ul class="comment-list">
              <li class="entry" v-for="comment in comments">
                <div class="avatar">
                  <a v-link="{ name: 'user_detail', params: { id: comment.user.id } }">
                    <img class="img-circle" :src="comment.user.avatar_url">
                  </a>
                </div>
                <div class="content">
                  <a v-link="{ name: 'user_detail', params: { id: comment.user.id } }">{{ comment.user.name }}</a>
                  <p>{{ comment.content }}</p>
                  <div>
                    <small class="text-muted">{{ comment.created_at }}</small>
                    <small class="text-muted"> &nbsp; </small>
                    <a href="#"><small class="text-muted">回复</small></a>
                    <small class="text-muted"> · </small>
                    <a href="#"><small class="text-muted">举报</small></a>
                    <span v-if="auth.check && auth.user.id === comment.user_id">
                      <small class="text-muted"> · </small>
                      <a href="#"><small class="text-muted red">删除</small></a>
                    </span>
                  </div>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
        <div class="row" v-if="comments.length > 0">
          <div class="col-sm-12">
            <p class="text-xs-center"><a href="#">查看全部评论</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { articleShow, articleVote, articleComment, articleCommentList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      articleShow,
      articleVote,
      articleComment,
      articleCommentList,
    },
  },
  data() {
    return {
      topic: {},
      data: {},
      comments: [],
      rules: {
        content: { required: true },
      },
      params: {
        content: '',
      },
    };
  },
  ready() {
    const articleId = this.$route.params.id;
    this.articleShow(articleId).then(data => {
      this.data = data;
      this.topic = data.topic;
    });
    this.loadComments(1);
  },
  methods: {
    loadComments(page) {
      const articleId = this.$route.params.id;
      this.articleCommentList(articleId, page).then(data => {
        this.comments = data.data;
      });
    },
    submit(e) {
      // 判断是否为按了Ctrl+Enter组合键
      if (e != null && !((e.metaKey || e.ctrlKey) && e.keyCode === 13)) {
        return;
      }
      this.articleComment(this.data.id, this.params).then((data) => {
        this.params.content = '';
        this.comments.push(data);
      });
    },
    vote() {
      if (this.data.voted) {
        return;
      }
      this.articleVote(this.data.id, 'up').then(() => {
        this.data.upvote_count += 1;
        this.data.voted = true;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.article-content img {
  max-width: 100%;
}
.article-content img.twemoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
