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
        </div>
        <loader :active="article === null" />
        <div class="extra" v-if="article">
          <div class="tags">
            <a class="ui tiny label" v-for="tag in article.tags">{{tag.name}}</a>
          </div>
          <div class="ui grid" style="margin-top: 10px; margin-bottom: 10px;">
            <div class="center aligned sixteen wide column">
              <div class="ui blue button">
                <i class="heart icon"></i> 赞({{article.upvote_count}})
              </div>
            </div>
          </div>
          <div class="ui grid">
            <div class="left aligned six wide column">
              <a :href="mailToReport">举报</a>
            </div>
            <div class="right aligned ten wide column">
              <a :href="article.link" v-if="article.link">阅读原文</a>
            </div>
          </div>
        </div>
        <h4 class="ui horizontal divider header">文章评论({{article == null ? 0 : article.comment_count}})</h4>
        <div class="ui comments">
          <div class="comment" v-for="comment in comments.lists">
            <a class="avatar">
              <imageView :src="comment.user.avatar_url" />
            </a>
            <div class="content">
              <a class="author">{{comment.user.name}}</a>
              <div class="metadata">
                <span class="date">{{comment.created_at | moment}}</span>
              </div>
              <div class="text">
                {{comment.content}}
              </div>
              <div class="actions">
                <a class="reply">回复</a>
              </div>
            </div>
          </div>
          <form class="ui reply form">
            <div class="field">
              <textarea></textarea>
            </div>
            <button class="ui blue submit button" type="submit">
              回复
            </button>
             <label>Ctrl+Enter</label>
          </form>
        </div>
      </div>
      <div class="five wide column">
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImageView from '../../components/ImageView';
import Loader from '../../components/Loader';
import MarkdownView from '../../components/MarkdownView';
import ShareButtonGroup from '../../components/ShareButtonGroup';

export default {
  components: {
    ImageView,
    Loader,
    MarkdownView,
    ShareButtonGroup,
  },
  computed: mapState({
    article: state => state.articles.detail.article,
    comments: state => state.articles.detail.comments,
    mailToReport() {
      const email = process.env.EMAIL_REPORT;
      const subject = `举报文章 -《${this.article.title}》`;
      const body = `ID: ${this.article.id}%0D%0A标题：${this.article.title}%0D%0A原因：-`;
      return `mailto:${email}?subject=${subject}&body=${body}`;
    },
  }),
  data() {
    return {
    };
  },
  methods: {
    loadMore(page) {
      const id = this.$route.params.slug;
      this.$store.dispatch('articleDetailGetLists', id, page);
    },
  },
  mounted() {
    const id = this.$route.params.slug;
    this.$store.dispatch('articleDetailGetData', id);
    this.loadMore(id, 1);
  },
  destroyed() {
    this.$store.dispatch('articleDetailClean');
  },
};
</script>

<style lang="scss" scoped>
.extra {
  margin-top: 20px;
}
.comments {
  max-width: 100%;
}
</style>
