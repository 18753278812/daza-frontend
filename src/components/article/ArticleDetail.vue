<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <h4>{{ data.article.title }}</h4>
        <div class="row">
          <div class="col-xs-9">
            <small class="text-muted">{{ data.article.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.article.published_at | moment }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.article.view_count }}阅读</small>
          </div>
          <div class="col-xs-3 text-xs-right">
            <a v-if="data.article.type === 'feed'" v-bind:href="data.article.link" target="_blank"><small class="text-muted">阅读原文</small></a>
          </div>
        </div>
        <div class="row article-content-top-topic" style="margin-top: 15px;">
          <div class="col-xs-2">
            <img class="img-circle lazy" :data-original="data.topic.image_url" style="width: 100%; height: auto; margin-right: 5px;">
          </div>
          <div class="col-xs-10" style="padding-left: 0;">
            <ul class="list-unstyled">
              <li><a v-link="{ name: 'topic_detail', params: { id: data.topic.id }}"><h6>{{ data.topic.name }}</h6></a></li>
              <li><small class="text-muted">{{ data.topic.subscriber_count }} 人订阅，由 <a v-link="{ name: 'user_detail', params: { id: data.topic.user.id } }">{{ data.topic.user.name }}</a> 维护</small></li>
            </ul>
          </div>
        </div>
        <hr style="margin-top: 0;">
        <blockquote class="blockquote" v-if="data.article.type === 'share'">
          <p>{{ data.article.summary }}</p>
          <a :href="data.article.link" target="_blank">立即跳转到文章</a>
        </blockquote>
        <p class="article-content" v-if="data.article.content_format === 'html'">{{{ data.article.content }}}</p>
        <p class="article-content" v-if="data.article.content_format === 'markdown'">{{{ data.article.content | commonmark }}}</p>
        <div class="row">
          <div class="col-xs-12">
            <h5 v-for="tag in data.article.tags" style="display: inline;">
              <span class="tag tag-default" v-link="{ name: 'tag_detail', params: { name: tag.name } }">{{ tag.name }}</span>
            </h5>
          </div>
        </div>
        <p>&nbsp;</p>
        <div class="row">
          <div class="col-xs-4">
            <a :href="mailToReport"><small class="text-muted">举报</small></a>
          </div>
          <div class="col-xs-8 text-xs-right">
            <form @submit.prevent="upvote()">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                :class="{ 'active': data.article.voted }">&nbsp;&nbsp;&nbsp;赞 ({{ data.article.upvote_count }})&nbsp;&nbsp;&nbsp;</button>
            </form>
          </div>
        </div>
        <hr>
        <div id="comments" class="row">
          <div class="col-sm-12">
            <p class="text-xs-left" v-if="data.comments.length > 0">{{ data.article.comment_count }}条精彩回复</p>
          </div>
        </div>
        <div class="row data-empty" v-if="data.comments.length == 0">
          <div class="col-sm-12">
            <p class="text-xs-center">空空如也</p>
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
                    <div class="extra" style="display: none;">
                      <a href="#"><small class="text-muted">回复</small></a>
                      <small class="text-muted"> · </small>
                      <a href="#"><small class="text-muted">举报</small></a>
                      <span v-if="auth.check && auth.user.id === comment.user_id">
                        <small class="text-muted"> · </small>
                        <a href="#"><small class="text-muted red">删除</small></a>
                      </span>
                    </div>
                  </div>
                </div>
                <hr>
              </li>
            </ul>
          </div>
          <div class="col-sm-12">
            <!-- 分页导航 -->
            <vue-pagination :pagination="pagination" :callback="loadComments"></vue-pagination>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <validator name="validation">
              <form novalidate @submit.prevent="submit()">
                <div class="form-group">
                  <textarea
                    id="bio-input"
                    class="form-control"
                    rows="3"
                    name="content"
                    v-model="params.content"
                    v-on:keyup="submit($event)"
                    v-validate:content="rules.content"></textarea>
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!$validation.valid">回复</button>
                    <small class="text-muted">&nbsp;Ctrl+Enter</small>
                  </div>
              </form>
            </validator>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-md-12">
        <div class="row article-content-side-topic">
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-4">
                <p>
                  <img class="lazy img-rounded" :data-original="topic.image_url" style="width: 100%; height: auto;">
                </p>
              </div>
              <div class="col-xs-8" style="padding-left: 0px;">
                <ul class="list-unstyled">
                  <li><a v-link="{ name: 'topic_detail', params: { id: data.topic.id }}"><h4>{{ data.topic.name }}</h4></a></li>
                  <li v-if="data.topic.website"><small class="text-muted">主页：<a :href="data.topic.website">{{ data.topic.website }}</a></small></li>
                  <li><small class="text-muted">{{ data.topic.subscriber_count }} 人订阅，由 <a v-link="{ name: 'user_detail', params: { id: data.topic.user.id } }">{{ data.topic.user.name }}</a> 维护</small></li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <p>{{ data.topic.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import VuePagination from '../_common/VuePagination';
import { auth } from '../../vuex/getters';
import {
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
      articleShow,
      articleVote,
      articleComment,
      articleCommentList,
    },
  },
  data() {
    return {
      page: 1,
      pagination: {},
      data: {
        topic: {
          user: {
            id: 0,
            name: '',
          },
        },
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
    NProgress.start();
    this.articleShow(articleId).then(data => {
      this.data.topic = data.data.topic;
      this.data.article = data.data;
      this.loadComments(this.page);
    });
  },
  computed: {
    mailToReport() {
      const email = process.env.EMAIL_REPORT;
      const subject = `举报文章 -《${this.data.article.title}》`;
      const body = `ID: ${this.data.article.id}%0D%0A标题：${this.data.article.title}%0D%0A原因：-`;
      return `mailto:${email}?subject=${subject}&body=${body}`;
    },
  },
  methods: {
    loadComments(page) {
      const articleId = this.$route.params.id;
      NProgress.start();
      this.articleCommentList(articleId, page).then(data => {
        this.data.comments = data.data;
        this.pagination = data.pagination;
        this.page = data.pagination.current_page;
        NProgress.done();
      });
    },
    submit(e) {
      // 判断是否为按了Ctrl+Enter组合键
      if (e != null && !((e.metaKey || e.ctrlKey) && e.keyCode === 13)) {
        return;
      }
      // 评论表单验证，避免提交空评论请求
      if (!this.$validation.valid) {
        return;
      }
      const article = this.data.article;
      const comments = this.data.comments;
      this.articleComment(article.id, this.params).then((data) => {
        this.params.content = '';
        // 将新评论插入到当前页最后一条，并且评论数+1
        const comment = data.data;
        comment.user = this.auth.user;
        comments.push(comment);
        article.comment_count = article.comment_count + 1;
      });
    },
    upvote() {
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
  components: {
    VuePagination,
  },
};
</script>

<style lang="scss" scoped>
.extra {
  display: inline-block;
}
</style>
