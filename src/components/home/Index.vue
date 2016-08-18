<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2">
        <!-- <ul class="nav nav-tabs">
          <li class="nav-item" v-for="category in categories" >
            <a class="nav-link" v-link="'/categories'"> {{ category.name }}</a>
          </li>
        </ul> -->
        <ul class="nav nav-pills nav-stacked">
          <li class="nav-item">
            <a class="nav-link" v-link="'/latest'">最新</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-link="'/popular'">推荐</a>
          </li>
          <li class="nav-item" v-for="category in categories">
            <a class="nav-link" v-link="'/categories'">{{ category.name }}</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-7 ">
        <ul class="article-list">
          <li class="article" v-for="data in results">
            <div class="row">
              <div class="col-sm-12">
                <div class="title">
                  <h5><a v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a></h5>
                  <p class="summary">{{ data.summary }}</p>
                </div>
                <div class="image" v-if="data.image_url">
                  <img  :src="data.image_url">
                </div>
              </div>
            </div>
            <div class="row">
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
      </div>
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary btn-block" v-link="'/articles/create'">写文章</button>
        <hr>
        <button type="button" class="btn btn-primary btn-block" v-link="'/articles/share'">分享文章</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      categories: state => state.categories.all,
    },
    actions: {
      getCategoryList,
    },
  },
  data() {
    return {
      results: [],
    };
  },
  ready() {
    // 加载分类
    this.getCategoryList();
    // 加载文章
    this.$http.get('v1/articles').then((response) => {
      this.results = response.data.data;
      console.log(response.data.data);
    }, (response) => {
      // error callback
      console.log(response);
    });
  },
};
</script>

<style scoped>
</style>
