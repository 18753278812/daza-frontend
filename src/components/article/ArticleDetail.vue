<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <h4>{{ data.title }}</h4>
        <div class="row">
          <div class="col-xs-9">
            <small class="text-muted">{{ data.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.published_at }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.view_count }}阅读</small>
          </div>
          <div class="col-xs-3 text-xs-right">
            <a v-bind:href="data.link" target="_blank"><small class="text-muted">阅读原文</small></a>
          </div>
        </div>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <div class="row">
          <div class="col-xs-12">
            <h5 v-for="tag in data.tags" style="display: inline;">
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
            <form @submit.prevent="vote()">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                :class="{ 'active': data.voted }">&nbsp;&nbsp;&nbsp;赞 ({{ data.upvote_count }})&nbsp;&nbsp;&nbsp;</button>
            </form>
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
                    <img class="img-circle" v-lazy="comment.user.avatar_url">
                  </a>
                </div>
                <div class="content">
                  <a v-link="{ name: 'user_detail', params: { id: comment.user.id } }">{{ comment.user.name }}</a>
                  <p>{{ comment.content }}</p>
                  <div>
                    <small class="text-muted">{{ comment.created_at }}</small>
                    <small class="text-muted"> &nbsp; </small>
                    <div class="extra">
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
      <div class="col-sm-4">
        <div class="row">
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-4">
                <p>
                  <img class="img-rounded" style="width: 100%; height: auto;" v-lazy="topic.image_url" >
                </p>
              </div>
              <div class="col-xs-8" style="padding-left: 0px;">
                <ul class="list-unstyled">
                  <li><a v-link="{ name: 'topic_detail', params: { id: topic.id }}"><h4>{{topic.name}}</h4></a></li>
                  <li><small class="text-muted">{{topic.subscriber_count}} 人订阅，由 <a v-link="{ name: 'user_detail', params: { id: topic.user.id } }">{{ topic.user.name }}</a> 维护</small></li>
                  <li><p>{{ topic.description }}</p></li>
              </div>
            </div>
          </div>
        </div>
        <hr style="margin-top: 0;">
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { articleShow, articleVote, articleComment, articleCommentList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';
import NProgress from 'nprogress';

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
      page: 1,
      pagination: {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 0,
        from: null,
        to: null,
      },
    };
  },
  ready() {
    const articleId = this.$route.params.id;
    NProgress.start();
    this.articleShow(articleId).then(data => {
      this.data = data;
      this.topic = data.topic;
      this.loadComments(this.page);
    });
  },
  computed: {
    mailToReport() {
      const reportEmail = process.env.EMAIL_REPORT;
      return `mailto:${reportEmail}?subject=[举报文章] ${this.data.title}`;
    },
  },
  methods: {
    loadComments(page) {
      const articleId = this.$route.params.id;
      NProgress.start();
      this.articleCommentList(articleId, page).then(data => {
        this.comments = data.data;
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
      this.articleComment(this.data.id, this.params).then((data) => {
        this.params.content = '';
        const comment = data;
        comment.user = this.auth.user;
        this.comments.push(comment);
        this.data.comment_count = this.data.comment_count + 1;
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
