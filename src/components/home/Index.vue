<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-9">
        <ul class="articles">
          <li class="article-item" v-for="data in results">
            <a v-link="{ name: 'in_app_article_detail', params: { id: data.id } }">
              <img v-if="data.image_url" v-bind:src="data.image_url">
              {{ data.title }}
              <p>{{ data.summary }}</p>
            </a>
            <a v-link="{ name: 'topic_detail', params: { id: data.topic.id } }">
              {{ data.topic.name }}
            </a>
            <label>{{ data.view_count }}阅读</label>
            <label>{{ data.comment_count }}评论</label>
            <hr>
          </li>
        </ul>
      </div>
      <div class="col-sm-3">
        <button type="button" class="btn btn-primary" v-link="'/topics/create'">创建主题</button>
        <button type="button" class="btn btn-primary" v-link="'/articles/create'">创建文章</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [],
    };
  },
  ready() {
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
.articles {
  list-style: none;
  padding-left: 0;
}
.articles > .article-item {

}
.articles img {
  width: 140px;
  height: 100px;
}
</style>
