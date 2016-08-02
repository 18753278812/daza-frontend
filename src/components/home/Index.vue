<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-9">
        <div class="articles">
          <div class="media entry" v-for="data in results">
            <div class="media-left image" v-if="data.image_url">
              <a href="#">
                <img class="media-object" v-bind:src="data.image_url">
              </a>
            </div>
            <div class="media-body">
              <h5 class="media-heading">
                <a v-link="{ name: 'in_app_article_detail', params: { id: data.id } }">{{ data.title }}</a>
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
            <hr>
          </div>
        </div>
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
.articles > .entry {
}
.articles > .entry > .image img {
  width: 150px;
  height: 110px;
}
</style>
