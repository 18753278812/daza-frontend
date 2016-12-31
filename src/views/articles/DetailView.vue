<template>
  <div class="ui main container" v-if="entity">
    <div class="ui stackable four column grid">
      <div class="eleven wide column">
        <h1 class="ui header">{{entity.title}}</h1>
        <div class="ui divider"></div>
        <markdown-view
          :text="entity.content"
          :format="entity.content_format" />

        <div class="ui comments">
          <h3 class="ui dividing header">Comments</h3>
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

export default {
  components: {
    MarkdownView,
  },
  computed: mapState({
    entity: state => state.articles.entity,
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
</style>
