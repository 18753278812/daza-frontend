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
            <a class="nav-link" v-link="{ name: 'home_index_slug', params: { slug: category.slug ? category.slug : category.id } }"> {{ category.name }}</a>
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
          <form novalidate method="get" target="_blank" action="/articles/share">
            <div class="form-group row">
              <div class="col-xs-12">
                <textarea
                  id="summary-input"
                  class="form-control"
                  rows="3"
                  name="source_link"
                  placeholder="将主题/文章链接粘贴到这里！"
                  v-model="source_link"
                  v-validate:email="rules.source_link"></textarea>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-xs-12 text-xs-right">
                <a v-link="{ name: 'article_create' }"><small class="text-muted">发表原创文章</small></a>
                <button type="submit" class="btn btn-primary btn-sm" :disabled="!$validation.valid">&nbsp;&nbsp;分享&nbsp;&nbsp;</button>
              </div>
            </div>
          </form>
        </validator>
        <hr>
        <div class="row">
          <div class="col-xs-6">
            <h5>最新主题</h5>
          </div>
          <div class="col-xs-6 text-xs-right">
            <a v-link="{ name: 'topic_list' }"><small class="text-muted">主题广场</small></a>
          </div>
          <div class="col-xs-12">
            <ul class="side-topic-list">
              <li v-for="topic in topics ">
                <div class="image">
                  <img v-lazy="topic.image_url">
                </div>
                <div class="content">
                  <a class="name" v-link="{ name: 'topic_detail', params: { id: topic.id } }">{{ topic.name }}</a>
                  <p class="description">{{ topic.description }}</p>
                  <small class="text-muted">{{ topic.subscriber_count }}订阅</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-xs-6">
            <h5>热门标签</h5>
          </div>
          <div class="col-xs-6 text-xs-right">
            <a v-link="{ name: 'tag_list' }"><small class="text-muted">全部标签</small></a>
          </div>
          <div class="col-xs-12">
            <span v-for="tag in tags">
              <span class="tag tag-default" v-link="{ name: 'tag_detail', params: { name: tag.name } }">{{ tag.name }}</span>
            </span>
          </div>
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
      rules: {
        source_link: { required: true, url: true },
      },
      source_link: '',
      tags: [
        { name: 'Android' },
        { name: 'iOS' },
        { name: 'macOS' },
      ],
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
  padding: 2px 8px 2px 8px;
}
.nav-link.active {
  border-radius: 20px;
}
// 侧边样主题列表样式
.side-topic-list {
  list-style-type: none;
  padding: 0;
  li {
    margin: 10px 0 10px 0;
    .image {
      display: table-cell;
      vertical-align: top;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .content {
      width: 10000px;
      display: table-cell;
      vertical-align: top;
      padding-left: 8px;
      .name {
        font-size: 13px;
      }
      .description {
        font-size: 10px;
        color: #bbb;
        margin-bottom: 2px;
      }
    }
  }
}
// 侧边栏文章列表样式
.side-article-list {

}
</style>
