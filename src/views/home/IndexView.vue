<template>
  <div class="ui main container">
    <div class="ui stackable four column grid">
      <div class="eleven wide column">
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
      <div class="computer only five wide column">
        <sidebar-ad :data="side_ad"></sidebar-ad>
        <sidebar-topics :data="side_topics"></sidebar-topics>
        <sidebar-links :data="side_links"></sidebar-links>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImageView from '../../components/ImageView';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import LoadMore from '../../components/LoadMore';
import SidebarAd from '../../components/SidebarAd';
import SidebarTopics from '../../components/SidebarTopics';
import SidebarLinks from '../../components/SidebarLinks';

export default {
  components: {
    ImageView,
    Loader,
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
