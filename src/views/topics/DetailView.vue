<template>
  <div>
    <div class="ui jumbotron inverted vertical center aligned segment">
      <div class="ui text container" v-if="topic">
        <h1 class="ui inverted header">
          <imageView
            class="ui tiny circular image"
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
      <ul>
        <li v-for="item in articles.lists">
          <router-link :to="{ name: 'article_detail', params: { slug: item.id } }">{{item.title}}</router-link>
        </li>
      </ul>
      <div class="ui basic center aligned segment" style="padding: 0px;">
        <pagination :pagination="articles.pagination" :callback="loadMore" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImageView from '../../components/ImageView';
import Pagination from '../../components/Pagination';
import LoadMore from '../../components/LoadMore';

export default {
  components: {
    ImageView,
    Pagination,
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
      this.$router.replace({ name: 'topic_detail', params: { slug: id }, query: { page } });
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
}
</style>
