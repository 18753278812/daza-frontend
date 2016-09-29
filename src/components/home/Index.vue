<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <!-- 分类导航 -->
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" href="#" v-link="{ name: 'home_index_slug', params: { slug: 'latest' } }">最新</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-link="{ name: 'home_index_slug', params: { slug: 'popular' } }">推荐</a>
          </li>
          <li class="nav-item" v-for="category in categories" >
            <a
              class="nav-link"
              v-link="{ name: 'home_index_slug', params: { slug: category.slug ? category.slug : category.id } }"> {{ category.name }}</a>
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
                  <img class="lazy img-rounded" :data-original="data.image_url">
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
        <div class="row">
          <div class="col-sm-12">
            <p class="text-xs-center" v-if="articles.length == 0">空空如也</p>
          </div>
        </div>
        <!-- 分页导航 -->
        <vue-pagination :pagination="pagination" :callback="loadArticles"></vue-pagination>
      </div>
      <div class="col-sm-4">
        <validator name="validation">
          <form novalidate onsubmit="return false;">
            <div class="form-group row">
              <div class="col-xs-12">
                <textarea
                  id="source_link-input"
                  class="form-control"
                  rows="3"
                  name="source_link"
                  placeholder="将主题/文章链接粘贴到这里！"
                  v-model="source_link"
                  v-validate:source_link="rules.source_link"></textarea>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-12 text-xs-right">
                <a v-link="{ name: 'article_create' }"><small class="text-muted">发表原创文章</small></a>
                <button
                  class="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#article-share-dialog"
                  >&nbsp;&nbsp;分享&nbsp;&nbsp;</button>
              </div>
            </div>
          </form>
        </validator>
        <index-side-topic-list></index-side-topic-list>
        <index-side-tag-list></index-side-tag-list>
        <index-side-beian></index-side-beian>
      </div>
    </div>
  </div>
  <!-- Article share dialog -->
  <article-share-dialog :link="source_link"></article-share-dialog>

</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getCategoryList, getArticleList } from '../../vuex/actions';
import IndexSideTopicList from './IndexSideTopicList';
import IndexSideTagList from './IndexSideTagList';
import IndexSideBeian from './IndexSideBeian';
import ArticleShareDialog from '../article/ArticleShareDialog';
import VuePagination from '../_common/VuePagination';

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
      page: 1,
      categoryId: null,
      categorySlug: null,
      pagination: {
        per_page: 15,
        current_page: 1,
        last_page: 0,
      },
      rules: {
        source_link: { required: true, url: true },
      },
      source_link: '',
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
    // 加载文章
    this.page = this.$route.query.page;
    this.categorySlug = this.$route.params.slug;
    this.categoryId = this.categorySlug;
    // NProgress.start();
    this.loadArticles(this.page);
  },
  route: {
    canReuse: false,
  },
  components: {
    IndexSideTopicList,
    IndexSideTagList,
    IndexSideBeian,
    ArticleShareDialog,
    VuePagination,
  },
  methods: {
    loadArticles(page) {
      window.scrollTo(0, 0);
      this.getArticleList(page, this.categoryId, this.categorySlug).then(data => {
        this.pagination = data.pagination;
        NProgress.done();
        $('img.lazy').lazyload();
      });
      const query = {
        page,
      };
      const params = {
        slug: this.categorySlug,
      };
      this.$route.router.go({ name: 'home_index_slug', query, params });
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
