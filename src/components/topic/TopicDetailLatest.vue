<template>
  <div class="row">
    <div class="col-sm-12">
      <!-- 文章列表 -->
      <ul class="article-list">
        <li class="entry" v-for="data in data.articles">
          <div class="row">
            <div class="col-sm-12">
              <div class="content" v-bind:class="{ haveimage: data.image_url !== '' }">
                <a class="title" v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
              </div>
              <div class="image" v-if="data.image_url">
                <img class="lazy img-rounded" :data-original="data.image_url | thumbnail">
              </div>
            </div>
          </div>
          <div class="row extra">
            <div class="col-xs-8">
              <small class="text-muted">{{ data.published_at | moment }}</small>
            </div>
            <div class="col-xs-4 text-xs-right">
              <small class="text-muted">{{ data.comment_count }}评论</small>
              <small class="text-muted"> · </small>
              <small class="text-muted">{{ data.view_count }}阅读</small>
            </div>
          </div>
          <hr>
        </li>
      </ul>
      <div class="row data-empty" v-if="data.articles.length == 0">
        <div class="col-sm-12">
          <p class="text-xs-center">空空如也</p>
        </div>
      </div>
      <!-- 分页导航 -->
      <vue-pagination :pagination="data.pagination" :callback="loadArticles"></vue-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getTopicArticleList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getTopicArticleList,
    },
  },
  data() {
    return {
      data: {
        articles: [],
        pagination: {
          per_page: 15,
          current_page: 1,
          last_page: 0,
        },
      },
    };
  },
  watch: {
    'data.articles': () => {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    this.loadArticles(1);
  },
  components: {
    VuePagination,
  },
  methods: {
    loadArticles(page) {
      window.scrollTo(0, 0);
      const topicId = this.$route.params.id;
      NProgress.start();
      this.getTopicArticleList(topicId, page).then(data => {
        this.data.articles = data.data;
        this.data.pagination = data.pagination;
        NProgress.done();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
