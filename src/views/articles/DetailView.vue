<template>
  <div class="ui main container">
    <div class="ui stackable four column grid">
      <div class="eleven wide column" v-if="article">
        <h1 class="ui header">
          {{article.title}}
          <div class="sub header">
            <label>
              {{article.author}}发表于 {{article.published_at | moment}} · {{article.view_count}}阅读
            </label>
          </div>
        </h1>
        <div class="ui divider"></div>
        <markdown-view
          :text="article.content"
          :format="article.content_format" />

        <div class="extra">
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

        <div class="ui comments">
          <h4 class="ui horizontal divider header">文章评论({{article.comment_count}})</h4>
          <div class="comment">
            <a class="avatar">
              <img src="/images/avatar/small/matt.jpg">
            </a>
            <div class="content">
              <a class="author">Matt</a>
              <div class="metadata">
                <span class="date">Today at 5:42PM</span>
              </div>
              <div class="text">
                How artistic!
              </div>
              <div class="actions">
                <a class="reply">Reply</a>
              </div>
            </div>
          </div>
          <div class="comment">
            <a class="avatar">
              <img src="/images/avatar/small/elliot.jpg">
            </a>
            <div class="content">
              <a class="author">Elliot Fu</a>
              <div class="metadata">
                <span class="date">Yesterday at 12:30AM</span>
              </div>
              <div class="text">
                <p>This has been very useful for my research. Thanks as well!</p>
              </div>
              <div class="actions">
                <a class="reply">Reply</a>
              </div>
            </div>
          </div>
          <div class="comment">
            <a class="avatar">
              <img src="/images/avatar/small/joe.jpg">
            </a>
            <div class="content">
              <a class="author">Joe Henderson</a>
              <div class="metadata">
                <span class="date">5 days ago</span>
              </div>
              <div class="text">
                Dude, this is awesome. Thanks so much
              </div>
              <div class="actions">
                <a class="reply">Reply</a>
              </div>
            </div>
          </div>
          <form class="ui reply form">
            <div class="field">
              <textarea></textarea>
            </div>
            <div class="ui blue labeled submit icon button">
              <i class="icon edit"></i> Add Reply
            </div>
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
import MarkdownView from '../../components/MarkdownView';
import ShareButtonGroup from '../../components/ShareButtonGroup';

export default {
  components: {
    MarkdownView,
    ShareButtonGroup,
  },
  computed: mapState({
    article: state => state.articles.entity,
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
  mounted() {
    const id = this.$route.params.slug;
    this.$store.dispatch('articleGetEntity', id);
  },
};
</script>

<style lang="scss" scoped>
.extra {
  margin-top: 20px;
}
</style>
