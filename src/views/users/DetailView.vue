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
    <div class="ui main container">
      <loader :pagination="topics.pagination" />
      <div class="topics">
        <div class="item" v-for="item in topics.lists">
          <a class="ui image">
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
      <div class="ui basic center aligned segment">
        <loadMore :pagination="topics.pagination" :callback="loadMore" />
      </div>
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
      this.$store.dispatch('userDetailGetLists', { id, page });
    },
  },
};
</script>

<style lang="scss" scoped>
.main.container {
  padding-top: 20px !important;
}
</style>
