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
            <a v-bind:href="data.link" target="_blank"><small class="text-muted">原文链接</small></a>
          </div>
        </div>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <div class="row">
          <div class="col-xs-12">
            <span v-for="tag in data.tags">
              <span class="tag tag-default" v-link="{ name: 'tag_detail', params: { name: tag.name } }">{{ tag.name }}</span>
            </span>
          </div>
        </div>
        <p>&nbsp;</p>
        <div class="row">
          <div class="col-xs-4">
            <a href="#"><small class="text-muted">分享</small></a>
            <a href="#"><small class="text-muted">举报</small></a>
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
        <div>
          <small class="text-muted" v-if="comments.count > 0">{{ data.comment_count }}条精彩回复</small>
          <p class="text-xs-center" v-if="comments.count == 0">
            暂无评论
          </p>
          <p v-for="comment in comments">
            {{ comment.user_id }}
            {{ comment.content }}
            {{ comment.created_at }}
          </p>
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
                <button
                  class="btn btn-primary"
                  type="submit"
                  :disabled="!$validation.valid">回复</button>
                  <small class="text-muted">Ctrl+Enter</small>
              </form>
            </validator>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <img class="card-img-top" :src="topic.image_url" alt="Card image cap" style="display: none;">
              <div class="card-block">
                <a v-link="{ name: 'topic_detail', params: { id: topic.id } }">
                  <h4 class="card-title">{{ topic.name }}</h4>
                </a>
                <div class="row">
                  <div class="col-xs-8">
                    <small class="text-muted">主题由 <a v-link="{ name: 'user_detail', params: { id: topic.user.id } }">{{ topic.user.name }}</a> 维护</small>
                  </div>
                  <div class="col-xs-4 text-xs-right">
                    <small class="text-muted">{{ topic.subscriber_count }}订阅</small>
                  </div>
                </div>
                <hr>
                <p class="card-text">{{ topic.description }}</p>
                <a href="#" class="btn btn-primary">订阅</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { articleVote, articleComment, articleCommentList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
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
    this.$http.get(`v1/articles/${articleId}?`).then((response) => {
      this.data = response.data.data;
      this.topic = this.data.topic;
      console.log(this.data);
    }, () => { });
    this.articleCommentList(articleId).then(data => {
      this.comments = data;
    });
  },
  methods: {
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
