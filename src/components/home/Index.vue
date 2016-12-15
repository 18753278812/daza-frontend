<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <!-- 分类导航 -->
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              v-link="{ name: 'home_index_slug', params: { slug: 'latest' } }"
              v-on:click="categoryChanged('latest')">最新</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              v-link="{ name: 'home_index_slug', params: { slug: 'popular' } }"
              v-on:click="categoryChanged('popular')">推荐</a>
          </li>
          <li class="nav-item" v-for="category in categories" >
            <a
              class="nav-link"
              v-link="{ name: 'home_index_slug', params: { slug: category.slug ? category.slug : category.id } }"
              v-on:click="categoryChanged(category.slug ? category.slug : category.id)"> {{ category.name }}</a>
          </li>
        </ul>
        <hr>
        <!-- 文章列表 -->
        <ul class="article-list">
          <li class="entry" v-for="data in articles">
            <div class="row">
              <div class="col-sm-12">
                <div class="content" v-bind:class="{ haveimage: data.image_url !== '' }">
                  <a class="title" v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
                </div>
                <div class="image" v-if="data.image_url">
                  <img v-lazy="data.image_url | thumbnail">
                </div>
              </div>
            </div>
            <div class="row extra">
              <div class="col-xs-8">
                <a v-link="{ name: 'topic_detail', params: { id: data.topic.id } }">{{ data.topic.name }}</a>
                <small class="text-muted"> · </small>
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
        <div class="row data-empty" v-if="articles.length == 0">
          <div class="col-sm-12">
            <p class="text-xs-center">空空如也</p>
          </div>
        </div>
        <!-- 分页导航 -->
        <vue-pagination :pagination="data.pagination" :callback="pageChanged"></vue-pagination>
      </div>
      <div class="col-sm-4">
        <!-- 侧边栏快速分享组件 -->
        <index-side-quick-share></index-side-quick-share>
        <!-- 侧边栏置顶广告组件 -->
        <index-side-ad></index-side-ad>
        <!-- 侧边栏最新主题组件 -->
        <index-side-topic-list></index-side-topic-list>
        <!-- 侧边栏热门标签组件 -->
        <index-side-tag-list></index-side-tag-list>
        <!-- 侧边栏友情链接组件 -->
        <index-side-links></index-side-links>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getCategoryList, getArticleList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';
import IndexSideQuickShare from './IndexSideQuickShare';
import IndexSideAd from './IndexSideAd';
import IndexSideTopicList from './IndexSideTopicList';
import IndexSideTagList from './IndexSideTagList';
import IndexSideLinks from './IndexSideLinks';

export default {
  vuex: {
    getters: {
      auth,
      categories: state => state.categories.all,
      articles: state => state.articles.all,
    },
    actions: {
      getCategoryList,
      getArticleList,
    },
  },
  data() {
    return {
      data: {
        slug: 'latest',
        page: 1,
        lists: [],
        pagination: {},
      },
    };
  },
  watch: {
    articles() {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    // 加载分类
    if (this.categories.length === 0) {
      this.getCategoryList();
    }

    const page = this.$route.query.page;
    const slug = this.$route.params.slug;

    this.load(page, slug);
  },
  components: {
    VuePagination,
    IndexSideQuickShare,
    IndexSideAd,
    IndexSideTopicList,
    IndexSideTagList,
    IndexSideLinks,
  },
  methods: {
    load(page, slug) {
      window.scrollTo(0, 0);
      NProgress.start();
      this.getArticleList(page, slug).then(data => {
        this.data.pagination = data.pagination;
        NProgress.done();
        $('img.lazy').lazyload();
      });
    },
    pageChanged(page) {
      this.data.page = page;
      const query = { page: this.data.page };
      const params = { slug: this.data.slug };

      this.$route.router.go({ name: 'home_index_slug', query, params });
      this.load(this.data.page, this.data.slug);
    },
    categoryChanged(slug) {
      this.data.page = 1;
      this.data.slug = slug;

      const params = { slug: this.data.slug };

      this.$route.router.go({ name: 'home_index_slug', query: { }, params });
      this.load(this.data.page, this.data.slug);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item+.nav-item {
  margin-left: 0px;
}
.nav-link {
  padding: 2px 12px 2px 12px;
}
.nav-link.active {
  border-radius: 20px;
}
</style>
