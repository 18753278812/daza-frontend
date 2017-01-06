<template>
  <div>
    <div class="ui masthead inverted vertical center aligned segment">
      <div class="ui text container" v-if="tag">
        <h1 class="ui inverted header">
          {{tag.name}}
        </h1>
        <div class="sub header">{{ tag.description }}</div>
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
                  <span>
                    <router-link :to="{ name: 'topic_detail', params: { slug: item.topic_id }}">{{item.topic.name}}</router-link>
                  </span>
                  <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
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
  data() {
    return {
    };
  },
  computed: mapState({
    tag: state => state.tags.detail.tag,
    articles: state => state.tags.detail.articles,
  }),
  methods: {
    loadMore(page) {
      const name = this.$route.params.name;
      this.$store.dispatch('tagDetailGetLists', { name, page });
    },
  },
  mounted() {
    const name = this.$route.params.name;
    this.$store.dispatch('tagDetailGetData', name);
    this.loadMore(name, 1);
  },
};
</script>

<style lang="scss" scoped>
.masthead.segment {
  padding-top: 80px !important;
}
.main.container {
  padding-top: 20px !important;
}
</style>
