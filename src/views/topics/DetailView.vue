<template>
  <div>
    <div class="ui jumbotron inverted vertical center aligned segment">
      <div v-if="entity">
        <h1 class="ui inverted header">
          <img class="ui tiny circular image" :src="entity.image_url">
        </h1>
        <h1 class="ui inverted header">
          {{entity.name}}
        </h1>
        <div class="sub header">{{ entity.description }}</div>
      </div>
    </div>
    <div class="ui main container">
      <ul>
        <li v-for="item in lists">
          <router-link :to="{ name: 'article_detail', params: { slug: item.id } }">{{item.title}}</router-link>
        </li>
      </ul>
      <div class="ui basic center aligned segment" style="padding: 0px;">
        <pagination :pagination="pagination" :callback="loadMore" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import Pagination from '../../components/Pagination';
import LoadMore from '../../components/LoadMore';

export default {
  components: {
    Pagination,
    LoadMore,
  },
  computed: mapState({
    entity: state => state.topics.entity,
    lists: state => state.topics.articles.data,
    pagination: state => state.topics.articles.pagination,
  }),
  data() {
    return {
    };
  },
  mounted() {
    const id = this.$route.params.slug;
    this.$store.dispatch('topicGetEntity', id);
    this.loadMore(1);
  },
  methods: {
    loadMore(page) {
      const id = this.$route.params.slug;
      this.$router.replace({ name: 'topic_detail', params: { slug: id }, query: { page } });
      this.$store.dispatch('topicArticleGetLists', { id, page });
    },
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
