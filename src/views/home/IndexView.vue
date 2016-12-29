<template>
  <div class="ui main container">
    <div class="ui stackable four column grid">
      <div class="twelve wide column">
        <div class="ui segment">
          <ul>
            <li v-for="item in articles.lists">
              <router-link :to="{ name: 'article_detail', params: { slug: item.id }}">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="ui basic center aligned segment" style="padding: 0px;">
          <loadMore :pagination="articles.pagination" :callback="loadMore" />
        </div>
      </div>
      <div class="four wide column">
        <sidebar-ad :data="side_ad"></sidebar-ad>
        <sidebar-topics :data="side_topics"></sidebar-topics>
        <sidebar-links :data="side_links"></sidebar-links>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Pagination from '../../components/Pagination';
import LoadMore from '../../components/LoadMore';
import SidebarAd from '../../components/SidebarAd';
import SidebarTopics from '../../components/SidebarTopics';
import SidebarLinks from '../../components/SidebarLinks';

export default {
  components: {
    Pagination,
    LoadMore,
    'sidebar-ad': SidebarAd,
    'sidebar-topics': SidebarTopics,
    'sidebar-links': SidebarLinks,
  },
  computed: mapState({
    articles: state => state.home.index.articles,
    side_ad: state => state.home.side_ad,
    side_topics: state => state.home.side_topics,
    side_links: state => state.home.side_links,
  }),
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('homeGetData');
    if (this.articles.lists.length === 0) {
      this.loadMore(1);
    }
  },
  methods: {
    loadMore(page) {
      this.$store.dispatch('homeIndexGetLists', page);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
