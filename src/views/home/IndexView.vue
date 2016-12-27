<template>
  <div class="ui main container">
    <div class="ui stackable four column grid">
      <div class="twelve wide column">
        <div class="ui segment">
          <p>N/A</p>
        </div>
        <loadMore :pagination="pagination" :callback="loadMore" />
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
import LoadMore from '../../components/LoadMore';
import SidebarAd from '../../components/SidebarAd';
import SidebarTopics from '../../components/SidebarTopics';
import SidebarLinks from '../../components/SidebarLinks';

export default {
  components: {
    LoadMore,
    'sidebar-ad': SidebarAd,
    'sidebar-topics': SidebarTopics,
    'sidebar-links': SidebarLinks,
  },
  computed: mapState({
    side_ad: state => state.home.side_ad,
    side_topics: state => state.home.side_topics,
    side_links: state => state.home.side_links,
  }),
  data() {
    return {
      pagination: {
        per_page: 15,
        current_page: 1,
        last_page: 10,
      },
    };
  },
  mounted() {
    this.$store.dispatch('homeGetData');
  },
  methods: {
    loadMore(page) {
      console.log(`Page: ${page}`);
      setTimeout(() => {
        this.pagination = {
          per_page: 15,
          current_page: page,
          last_page: 10,
        };
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
