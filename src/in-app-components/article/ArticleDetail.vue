<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4>{{ data.article.title }}</h4>
        <div class="row">
          <div class="col-xs-12">
            <small class="text-muted">{{ data.article.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.article.published_at | moment }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.article.view_count }}阅读</small>
          </div>
        </div>
        <div class="row" style="margin-top: 15px; ">
          <div class="col-xs-8">
            <a href="#">
              <img class="img-circle lazy" :data-original="data.topic.image_url" style="width: 1.8rem; height: 1.8rem; margin-right: 5px;">{{ data.topic.name }}
            </a>
          </div>
          <div class="col-xs-4 text-xs-right">
            <form @submit.prevent="subscribe(data.topic.id)">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                :class="{ 'active': data.topic.subscribed }">&nbsp;&nbsp;&nbsp;订阅 ({{ data.topic.subscriber_count }})&nbsp;&nbsp;&nbsp;</button>
            </form>
          </div>
        </div>
        <hr>
        <blockquote class="blockquote" v-if="data.article.type === 'share'">
          <p>{{ data.article.summary }}</p>
          <a :href="data.article.link" target="_blank">立即跳转到文章</a>
        </blockquote>
        <p class="article-content" v-if="data.article.content_format === 'html'">{{{ data.article.content }}}</p>
        <p class="article-content" v-if="data.article.content_format === 'markdown'">{{{ data.article.content | commonmark }}}</p>
        <p>
          <div class="row">
            <div class="col-xs-12">
              <span v-for="tag in data.article.tags">
                <span class="tag tag-default">{{ tag.name }}</span>
              </span>
            </div>
          </div>
        </p>
        <div class="row">
          <div class="col-xs-6">
            <a :href="mailToReport"><small class="text-muted">举报</small></a>
          </div>
          <div class="col-xs-6 text-xs-right">
            <a v-if="data.article.type === 'feed'" :href="data.article.link" target="_blank"><small class="text-muted">阅读原文</small></a>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-12">
            <p class="text-xs-left" v-if="data.comments.length > 0">{{ data.article.comment_count }}条精彩回复</p>
            <p class="text-xs-center" v-if="data.comments.length == 0">空空如也</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <ul class="comment-list">
              <li class="entry" v-for="comment in data.comments">
                <div class="avatar">
                  <a v-link="{ name: 'user_detail', params: { id: comment.user.id } }">
                    <img class="lazy img-circle" :data-original="comment.user.avatar_url">
                  </a>
                </div>
                <div class="content">
                  <a v-link="{ name: 'user_detail', params: { id: comment.user.id } }">{{ comment.user.name }}</a>
                  <p>{{ comment.content }}</p>
                  <div>
                    <small class="text-muted">{{ comment.created_at | moment }}</small>
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
        <div class="row" v-if="data.comments.length > 0">
          <div class="col-sm-12">
            <p class="text-xs-center"><a href="#">查看全部评论</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { auth } from '../../vuex/getters';
import {
  topicSubscribe,
  articleShow,
  articleVote,
  articleComment,
  articleCommentList,
} from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      topicSubscribe,
      articleShow,
      articleVote,
      articleComment,
      articleCommentList,
    },
  },
  data() {
    return {
      data: {
        topic: {},
        article: {},
        comments: [],
      },
      rules: {
        content: { required: true },
      },
      params: {
        content: '',
      },
    };
  },
  watch: {
    'data.topic': () => {
      $('img.lazy').lazyload();
    },
    'data.comments': () => {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    const articleId = this.$route.params.id;
    this.articleShow(articleId).then(data => {
      this.data.article = data.data;
      this.data.topic = data.data.topic;
    });
    this.loadComments(1);
  },
  computed: {
    mailToReport() {
      const article = this.data.article;
      const reportEmail = process.env.EMAIL_REPORT;
      return `mailto:${reportEmail}?subject=[举报文章] ${article.title}`;
    },
  },
  methods: {
    loadComments(page) {
      const articleId = this.$route.params.id;
      this.articleCommentList(articleId, page).then(data => {
        this.data.comments = data.data;
      });
    },
    submit(e) {
      // 判断是否为按了Ctrl+Enter组合键
      if (e != null && !((e.metaKey || e.ctrlKey) && e.keyCode === 13)) {
        return;
      }
      this.articleComment(this.data.id, this.params).then((data) => {
        this.params.content = '';
        this.data.comments.push(data);
      });
    },
    subscribe(id) {
      const topic = this.data.topic;
      if (topic.subscribed) {
        return;
      }
      this.topicSubscribe(id).then(() => {
        topic.subscriber_count += 1;
        topic.subscribed = true;
      });
    },
    vote() {
      const article = this.data.article;
      if (article.voted) {
        return;
      }
      this.articleVote(article.id, 'up').then(() => {
        article.upvote_count += 1;
        article.voted = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
