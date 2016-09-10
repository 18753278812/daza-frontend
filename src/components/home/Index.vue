<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <!-- 分类导航 -->
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" href="#" v-link="{ name: 'home.index.slug', params: { slug: 'latest' } }">最新</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-link="{ name: 'home.index.slug', params: { slug: 'popular' } }">推荐</a>
          </li>
          <li class="nav-item" v-for="category in categories" >
            <a class="nav-link" v-link="{ name: 'home.index.slug', params: { slug: category.slug ? category.slug : category.id } }"> {{ category.name }}</a>
          </li>
        </ul>
        <hr>
        <!-- 文章列表 -->
        <ul class="article-list">
          <li class="entry" v-for="data in articles">
            <div class="row">
              <div class="col-sm-12">
                <div class="content">
                  <a class="title" v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
                </div>
                <div class="image" v-if="data.image_url">
                  <img v-lazy="data.image_url">
                </div>
              </div>
            </div>
            <div class="row extra">
              <div class="col-xs-8">
                <a v-link="{ name: 'topic_detail', params: { id: data.topic.id } }">{{ data.topic.name }}</a>
                <small class="text-muted"> · </small>
                <small class="text-muted">{{ data.published_at }}</small>
              </div>
              <div class="col-xs-4 text-xs-right">
                <small class="text-muted">{{ data.view_count }}阅读</small>
                <small class="text-muted"> · </small>
                <small class="text-muted">{{ data.comment_count }}评论</small>
              </div>
            </div>
            <hr>
          </li>
        </ul>
        <div class="row">
          <div class="col-sm-12">
            <p class="text-xs-center" v-if="articles.length == 0">空空如也</p>
          </div>
        </div>
        <!-- 分页导航 -->
        <vue-pagination :pagination="pagination" :callback="loadArticles"></vue-pagination>
      </div>
      <div class="col-sm-4">
        <div class="list-group">
          <a href="#" class="list-group-item disabled">
            最新主题
          </a>
          <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
          <a href="#" class="list-group-item">Morbi leo risus</a>
          <a href="#" class="list-group-item">Porta ac consectetur ac</a>
          <a href="#" class="list-group-item">Vestibulum at eros</a>
        </div>
        <hr>
        <div class="list-group">
          <a href="#" class="list-group-item disabled">
            最热主题
          </a>
          <a v-link="{ name: 'topic_detail', params: { id: topic.id } }" class="list-group-item" v-for="topic in topics ">{{ topic.name }}</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getCategoryList, getArticleList, getTopicList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';
import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
      categories: state => state.categories.all,
      topics: state => state.topics.all,
      articles: state => state.articles.all,
    },
    actions: {
      getCategoryList,
      getTopicList,
      getArticleList,
    },
  },
  data() {
    return {
      page: 1,
      categoryId: null,
      categorySlug: null,
      pagination: {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 0,
        from: null,
        to: null,
      },
    };
  },
  ready() {
    // 加载分类
    if (this.categories.length === 0) {
      this.getCategoryList();
    }
    // 加载文章
    this.page = this.$route.query.page;
    this.categorySlug = this.$route.params.slug;
    this.categoryId = this.categorySlug;
    NProgress.start();
    this.getArticleList(this.page, this.categoryId, this.categorySlug).then(data => {
      this.pagination = data.pagination;
      NProgress.done();
    });
    // 加载最新主题
    this.getTopicList(1);
    // // 加载最热主题
    // this.getTopicList(1);
  },
  route: {
    canReuse: false,
  },
  components: {
    VuePagination,
  },
  methods: {
    loadArticles(page) {
      window.scrollTo(0, 0);
      const query = {
        page,
      };
      const params = {
        slug: this.categorySlug,
      };
      this.$route.router.go({ name: 'home.index.slug', query, params });
    },
  },
};
</script>

<style scoped>
.nav-item+.nav-item {
  margin-left: 0px;
}
.nav-link {
  padding: 2px 8px 2px 8px;
}
.nav-link.active {
  border-radius: 20px;
}
</style>
