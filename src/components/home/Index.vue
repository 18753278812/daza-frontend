<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-2">
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
      <div class="col-xs-12 col-sm-7">
        <div class="articles">
          <div class="media entry" v-for="data in results">
            <div class="media-body">
              <h5 class="media-heading">
                <a v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
              </h5>
              <p>{{ data.summary }}</p>
              <div class="extra">
                <a v-link="{ name: 'topic_detail', params: { id: data.topic.id } }">
                  {{ data.topic.name }}
                </a>
                <label>{{ data.view_count }}阅读</label>
                <label>{{ data.comment_count }}评论</label>
              </div>
            </div>
            <div class="media-right image" v-if="data.image_url">
              <a href="#">
                <img class="media-object" v-bind:src="data.image_url">
              </a>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary btn-block" v-link="'/articles/create'">写文章</button>
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
.articles > .entry {
}
.articles > .entry > .image img {
  width: 150px;
  height: 110px;
}
</style>
