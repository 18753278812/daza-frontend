<template>
  <div class="ui main container">
    <h1 class="ui header">主题广场</h1>
    <loader :active="topics.pagination === null" />
    <div class="topics">
      <div class="item" v-for="item in topics.lists">
        <a class="ui bordered rounded image">
          <imageView
            :src="item.image_url"
          />
        </a>
        <div class="content">
          <router-link class="header" :to="{ name: 'topic_detail', params: { slug: item.id } }">{{item.name}}</router-link>
          <div class="description">
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <loadMore :pagination="topics.pagination" :callback="loadMore" />
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
    topics: state => state.topics.index.topics,
  }),
  data() {
    return {
    };
  },
  mounted() {
    this.loadMore(1);
  },
  methods: {
    loadMore(page) {
      this.$store.dispatch('topicIndexGetLists', page);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
