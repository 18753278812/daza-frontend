<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <!-- 分类导航 -->
        <ul class="nav nav-inline">
          <li class="nav-item">
            <a class="nav-link" v-link="{ name: 'home.index', query: { category_slug: 'latest' } }"v-link="'/latest'">最新</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-link="{ name: 'home.index', query: { category_slug: 'popular' } }"v-link="'/popular'">推荐</a>
          </li>
          <li class="nav-item" v-for="category in categories" >
            <a class="nav-link" v-link="{ name: 'home.index', query: { category_id: category.id } }"> {{ category.name }}</a>
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
                  <img :src="data.image_url">
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
        <!-- 分页导航 -->
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1 <span class="sr-only">(current)</span></a>
            </li>
            <li class="page-item"><a class="page-link"  v-link="{ name: 'home.index', query: { category_id: categoryId, category_slug: categorySlug, page: page } }">2</a></li>
            <li class="page-item"><a class="page-link" href="/?page=3">3</a></li>
            <li class="page-item"><a class="page-link" href="/?page=4">4</a></li>
            <li class="page-item"><a class="page-link" href="/?page=5">5</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-sm-4">
        <div class="list-group" v-if="auth.check()">
          <a href="#" class="list-group-item disabled">
            Cras justo odio
          </a>
          <a href="#" class="list-group-item">我订阅的主题 <span class="tag tag-default">0</span></a>
          <a href="#" class="list-group-item">我收藏的文章 <span class="tag tag-default">0</span></a>
          <a href="#" class="list-group-item">我赞过的文章 <span class="tag tag-default">0</span></a>
        </div>
        <hr>
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
          <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
          <a href="#" class="list-group-item">Morbi leo risus</a>
          <a href="#" class="list-group-item">Porta ac consectetur ac</a>
          <a href="#" class="list-group-item">Vestibulum at eros</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getCategoryList, getArticleList } from '../../vuex/actions';

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
    };
  },
  ready() {
    // 加载分类
    this.getCategoryList();
    // 加载文章
    this.page = this.$route.query.page;
    this.categoryId = this.$route.query.category_id;
    this.categorySlug = this.$route.query.category_slug;
    this.getArticleList(this.page, this.categoryId, this.categorySlug);
  },
  route: {
    canReuse: false,
  },
};
</script>

<style scoped>
</style>
