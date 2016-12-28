<template>
  <div class="ui main container">
    <div class="ui items">
      <div class="item" v-for="item in lists">
        <a class="ui small image">
          <img :src="item.image_url">
        </a>
        <div class="content">
          <router-link class="header" :to="{ name: 'topic_detail', params: { slug: item.id } }">{{item.name}}</router-link>
          <div class="description">
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ui basic center aligned segment" style="padding: 0px;">
      <loadMore :pagination="pagination" :callback="loadMore" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadMore from '../../components/LoadMore';

export default {
  components: {
    LoadMore,
  },
  computed: mapState({
    lists: state => state.topics.lists.data,
    pagination: state => state.topics.lists.pagination,
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
      this.$store.dispatch('topicGetLists', page);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
