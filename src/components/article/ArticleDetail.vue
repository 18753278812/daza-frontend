<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <h4>{{ data.title }}</h4>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <hr>
        <div>
          {{0}}条精彩回复
        </div>
        <form>
          <div class="form-group">
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-sm-3">
        <a v-link="{ name: 'topic_detail', params: { id: data.topic.id } }">
          {{ data.topic.name }}
        </a>
        {{ data.topic.description }}
        <button class="btn btn-secondary">订阅</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  ready() {
    const articleId = this.$route.params.id;

    this.$http.get(`v1/articles/${articleId}?`).then((response) => {
      this.data = response.data.data;
      console.log(this.data);
    }, () => { });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.article-content img {
  max-width: 100%;
}
.article-content img.twemoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
