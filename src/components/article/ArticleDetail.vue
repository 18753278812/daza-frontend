<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <h4>{{ data.title }}</h4>
        <div class="row">
          <div class="col-xs-9">
            <small class="text-muted">{{ data.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.published_at }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.view_count }}阅读</small>
          </div>
          <div class="col-xs-3 text-xs-right">
            <a v-bind:href="data.link" target="_blank"><small class="text-muted">原文链接</small></a>
          </div>
        </div>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <div class="row">
          <div class="col-xs-9">
            <span class="tag tag-default">Default</span>
            <span class="tag tag-default">Default</span>
            <span class="tag tag-default">Default</span>
            <span class="tag tag-default">Default</span>
            <span class="tag tag-default">Default</span>
          </div>
          <div class="col-xs-3 text-xs-right">
            <a href="#"><small class="text-muted">举报</small></a>
          </div>
        </div>
        <hr>
        <div>
          {{0}}条精彩回复
          <p>
            暂无评论
          </p>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <form>
              <div class="form-group">
                <textarea
                  class="form-control"
                  rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">确认</button>
            </form>
          </div>
        </div>
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
