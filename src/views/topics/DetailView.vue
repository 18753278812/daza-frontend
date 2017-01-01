<template>
  <div>
    <div class="ui jumbotron inverted vertical center aligned segment">
      <div class="ui text container" v-if="topic">
        <h1 class="ui inverted header">
          <imageView
            class="ui bordered rounded image"
            :src="topic.image_url"
          >
        </h1>
        <h1 class="ui inverted header">
          {{topic.name}}
        </h1>
        <div class="sub header">{{ topic.description }}</div>
      </div>
    </div>
    <div class="ui main container">
      <loader :active="articles.pagination === null" />
      <div class="articles">
        <div class="item" v-for="item in articles.lists">
          <div class="content">
            <div class="intro">
              <router-link class="header" :to="{ name: 'article_detail', params: { slug: item.id }}">{{item.title}}</router-link>
              <div class="description">
                <p class="summary" v-html="item.summary"></p>
              </div>
            </div>
            <div class="image" v-if="item.image_url">
              <imageView
                :src="item.image_url">
            </div>
          </div>
          <div class="extra">
            <div class="ui grid">
              <div class="left aligned ten wide column">
                <span>{{item.published_at | moment}}</span>
              </div>
              <div class="right aligned six wide column">
                <span>{{item.comment_count}}评论</span>
                <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                <span>{{item.view_count}}阅读</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loadMore :pagination="articles.pagination" :callback="loadMore" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImageView from '../../components/ImageView';
import Loader from '../../components/Loader';
import LoadMore from '../../components/LoadMore';

export default {
  components: {
    ImageView,
    Loader,
    LoadMore,
  },
  computed: mapState({
    topic: state => state.topics.detail.topic,
    articles: state => state.topics.detail.articles,
  }),
  data() {
    return {
    };
  },
  methods: {
    loadMore(page) {
      const id = this.$route.params.slug;
      this.$store.dispatch('topicDetailGetLists', { id, page });
    },
  },
  mounted() {
    const id = this.$route.params.slug;
    this.$store.dispatch('topicDetailGetData', id);
    this.loadMore(1);
  },
  destroyed() {
    this.$store.dispatch('topicDetailClean');
  },
};
</script>

<style lang="scss" scoped>
.jumbotron {
  background-color: #455A64;
  .display-3, .lead {
    color: #FFFFFF;
  }
  .image {
    width: 80px;
    height: 80px;
  }
}
.main.container {
  padding-top: 20px !important;
}
</style>
