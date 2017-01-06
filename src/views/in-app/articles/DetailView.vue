<template>
  <div class="ui main container">
    <div class="ui stackable four column grid">
      <div class="eleven wide column">
        <h1 class="ui header"  v-if="article">
          {{article.title}}
          <div class="sub header">
            <label>
              {{article.author}}发表于 {{article.published_at | moment}} · {{article.view_count}}阅读
            </label>
          </div>
        </h1>
        <div class="ui divider"></div>
        <div class="content" v-if="article">
          <markdown-view
            :text="article.content"
            :format="article.content_format" />
          <div v-if="!article.content">
            <blockquote v-html="article.summary" />
            <a :href="article.link" target="_blank" v-if="article.link">立即跳转到文章<a/>
          </div>
        </div>
        <loader :active="article === null" />
        <div class="extra" v-if="article">
          <div class="tags">
            <label class="ui tiny label" v-for="tag in article.tags">{{tag.name}}</label>
          </div>
          <div class="ui grid" style="margin-top: 10px; margin-bottom: 10px;">
            <div class="center aligned sixteen wide column">
              <div class="ui tiny blue button" v-on:click="upvoteArticle()">
                <i class="heart icon"></i> {{isUpvated ? '已' : ''}}赞({{upvoteCount}})
              </div>
            </div>
          </div>
          <div class="ui grid">
            <div class="left aligned six wide column">
              <a :href="mailToReport">举报</a>
            </div>
            <div class="right aligned ten wide column">
              <a :href="article.link" v-if="article.link" target="_blank">阅读原文</a>
            </div>
          </div>
        </div>
        <h4 class="ui horizontal divider header">文章评论({{article == null ? 0 : article.comment_count}})</h4>
        <div class="ui comments">
          <div class="comment" v-for="comment in comments.lists">
            <a class="avatar">
              <imageView :src="comment.user.avatar_url" v-if="comment.user" />
            </a>
            <div class="content">
              <a class="author" v-if="comment.user">{{comment.user.name}}</a>
              <div class="metadata">
                <span class="date">{{comment.created_at | moment}}</span>
              </div>
              <div class="text">
                {{comment.content}}
              </div>
            </div>
          </div>
          <div class="ui grid" style="margin-top: 10px; margin-bottom: 10px;">
            <div class="center aligned sixteen wide column">
              <a :href="'daza://articles/' + article.id + '/comments'">查看全部评论</a>
            </div>
          </div>
        </div>
      </div>
      <div class="five wide column">
        <div class="ui cards">
          <div class="card" v-if="article">
            <div class="content">
              <imageView
                class="right floated mini ui image"
                :src="article.topic.image_url"
                />
              <div class="header">
                {{article.topic.name}}
              </div>
              <div class="meta">
                <span class="founder">
                  由 <a :href="'daza://users/' + article.topic.user_id">{{article.topic.user.name }}</a> 维护
                </span>
              </div>
              <div class="description">
                {{article.topic.description}}
              </div>
            </div>
            <div class="extra content">
              <div class="ui tiny two buttons">
                <a :href="'daza://topics/' + article.topic_id" class="ui basic blue button">查看</a>
                <div class="ui basic green button" v-on:click="subscribeTopic">{{isSubscribed ? '已' : ''}}订阅({{subscriberCount}})</div>
              </div>
            </div>
          </div>
        </div>
        <sidebarAdsByGoogle />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImageView from '../../../components/ImageView';
import Loader from '../../../components/Loader';
import MarkdownView from '../../../components/MarkdownView';

export default {
  components: {
    ImageView,
    Loader,
    MarkdownView,
  },
  data() {
    return {
      params: {
        content: '',
      },
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
    article: state => state.articles.detail.article,
    comments: state => state.articles.detail.comments,
    comment: state => state.articles.detail.comment,
    upvote: state => state.articles.detail.upvote,
    subscribe: state => state.articles.detail.subscribe,
    isUpvated() {
      return this.article.upvoted || this.upvote.success;
    },
    upvoteCount() {
      return this.article.upvote_count + (this.upvote.success ? 1 : 0);
    },
    isSubscribed() {
      return this.article.topic.subscribed || this.subscribe.success;
    },
    subscriberCount() {
      return this.article.topic.subscriber_count + (this.subscribe.success ? 1 : 0);
    },
    mailToReport() {
      const email = process.env.EMAIL_REPORT;
      const subject = `举报文章 -《${this.article.title}》`;
      const body = `ID: ${this.article.id}%0D%0A标题：${this.article.title}%0D%0A原因：-`;
      return `mailto:${email}?subject=${subject}&body=${body}`;
    },
  }),
  methods: {
    loadMore(page) {
      const id = this.$route.params.slug;
      this.$store.dispatch('articleDetailGetLists', { id, page });
    },
    upvoteArticle() {
      if (this.isUpvated) {
        return;
      }
      const id = this.$route.params.slug;
      this.$store.dispatch('articleDetailUpvote', id);
    },
    subscribeTopic() {
      if (this.isSubscribed) {
        return;
      }
      this.$store.dispatch('articleDetailTopicSubscribe', this.article.topic_id);
    },
    submit(e) {
      // 判断是否为按了Ctrl+Enter组合键
      if (e != null && !((e.metaKey || e.ctrlKey) && e.keyCode === 13)) {
        return;
      }
      const id = this.$route.params.slug;
      this.$store.dispatch('articleDetailComment', { id, params: this.params });
    },
    commentSuccessWatcher(val) {
      if (val) {
        this.params.content = '';
      }
    },
    upvoteWatcher() {
      this.article.upvote_count += 1;
    },
  },
  watch: {
    article() {
      global.document.title = `${this.article.title} - daza.io`;
    },
    'comment.success': 'commentSuccessWatcher',
    upvote: 'upvoteWatcher',
  },
  beforeCreate() {
    this.$store.dispatch('articleDetailInit');
  },
  mounted() {
    const id = this.$route.params.slug;
    this.$store.dispatch('articleDetailGetData', id);
    this.loadMore(1);
  },
};
</script>

<style lang="scss" scoped>
.main .sub.header {
  margin-top: 10px;
}
.content {
  blockquote {
    padding: 0 1em;
    color: #777;
    border-left: 0.25em solid #ddd;
    margin-left: 0px;
    margin-bottom: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  a {
    font-size: 18px;
  }
}
.extra {
  margin-top: 20px;
}
.comments {
  max-width: 100%;
  .reply.form textarea {
    height: auto;
  }
}
.cards > .card {
  width: 100%;
}
</style>
