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
            <div class="col-xs-9">
              <span v-for="tag in data.tags">
                <span class="tag tag-default">{{ tag.name }}</span>
              </span>
            </div>
            <div class="col-xs-3 text-xs-right">
              <a href="#"><small class="text-muted">举报</small></a>
            </div>
          </div>
        </p>
        <div class="row">
          <div class="col-xs-12">
            <a :href="data.link" target="_blank">[ 阅读原文 ]</a>
          </div>
        </div>
        <hr>
        <div>
          {{0}}条精彩回复
          <p>
            暂无评论
          </p>
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
