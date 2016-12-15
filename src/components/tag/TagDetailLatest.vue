<template>
  <div class="row">
    <div class="col-sm-12">
      <!-- 文章列表 -->
      <ul class="article-list">
        <li class="entry" v-for="data in data.lists">
          <div class="row">
            <div class="col-sm-12">
              <div class="content" v-bind:class="{ haveimage: data.image_url !== '' }">
                <a class="title" v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
              </div>
              <div class="image" v-if="data.image_url">
                <img class="img-rounded" v-lazy="data.image_url | thumbnail">
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
      <div class="row data-empty" v-if="data.lists.length == 0">
        <div class="col-sm-12">
          <p class="text-xs-center">空空如也</p>
        </div>
      </div>
      <!-- 分页导航 -->
      <vue-pagination :pagination="data.pagination" :callback="pageChanged"></vue-pagination>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getTagArticleList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getTagArticleList,
    },
  },
  data() {
    return {
      data: {
        page: 1,
        tagName: null,
        lists: [],
        pagination: {},
      },
    };
  },
  ready() {
    this.data.page = this.$route.query.page;
    this.data.tagName = this.$route.params.tag_name;
    this.load(this.data.page);
  },
  components: {
    VuePagination,
  },
  methods: {
    load(page) {
      window.scrollTo(0, 0);
      const tagName = this.$route.params.name;
      NProgress.start();
      this.getTagArticleList(tagName, page).then(data => {
        this.data.lists = data.data;
        this.data.pagination = data.pagination;
        NProgress.done();
      });
    },
    pageChanged(page) {
      this.data.page = page;
      const query = { page: this.data.page };
      const params = { tag_name: this.data.tagName };

      this.$route.router.go({ name: 'tag_detail', query, params });
      this.load(this.data.page);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
