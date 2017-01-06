<template>
  <div>
    <div class="ui masthead inverted vertical center aligned segment">
      <div v-if="user">
        <h1 class="ui inverted header">
          <imageView
            class="ui tiny circular image"
            :src="user.avatar_url"
          >
        </h1>
        <h2 class="ui inverted header">
          {{user.name}}
        </h2>
        <div class="sub header">{{ user.bio }}</div>
      </div>
    </div>
    <div class="ui main container">
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
            <div class="extra">
              <router-link
                v-if="auth.id === item.user_id"
                :to="{ name: 'topic_edit', params: { slug: item.id }}">编辑</router-link>
            </div>
          </div>
        </div>
      </div>
      <loadMore :pagination="topics.pagination" :callback="loadMore" />
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
    auth: state => state.account.auth,
    user: state => state.users.detail.user,
    topics: state => state.users.detail.topics,
  }),
  data() {
    return {
    };
  },
  methods: {
    loadMore(page) {
      const id = this.$route.params.id;
      this.$store.dispatch('userDetailGetLists', { id, page });
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('userDetailGetData', id);
    this.loadMore(1);
  },
  destroyed() {
    this.$store.dispatch('userDetailClean');
  },
};
</script>

<style lang="scss" scoped>
.masthead {
  .image {
    width: 80px;
    height: 80px;
  }
  .sub.header {
    color: #BDBDBD;
  }
}
.main.container {
  padding-top: 20px !important;
}
</style>
