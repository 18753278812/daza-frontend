<template>
  <div>
    <div class="ui jumbotron inverted vertical center aligned segment">
      <div v-if="user">
        <h1 class="ui inverted header">
          <imageView
            class="ui tiny circular image"
            :src="user.avatar_url"
          >
        </h1>
        <h1 class="ui inverted header">
          {{user.name}}
        </h1>
        <div class="sub header">{{ user.bio }}</div>
      </div>
    </div>
    <div class="ui container">
      <ul>
        <li v-for="item in topics.lists">
          <router-link :to="{ name: 'topic_detail', params: { slug: item.id } }">{{item.name}}</router-link>
        </li>
      </ul>
      <div class="ui basic center aligned segment" style="padding: 0px;">
        <loadMore :pagination="topics.pagination" :callback="loadMore" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImageView from '../../components/ImageView';
import LoadMore from '../../components/LoadMore';

export default {
  components: {
    ImageView,
    LoadMore,
  },
  computed: mapState({
    user: state => state.users.detail.user,
    topics: state => state.users.detail.topics,
  }),
  data() {
    return {
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('userDetailGetData', id);
    this.loadMore(1);
  },
  methods: {
    loadMore(page) {
      const id = this.$route.params.id;
      this.$router.replace({ name: 'user_detail', params: { id }, query: { page } });
      this.$store.dispatch('userDetailGetLists', { id, page });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
