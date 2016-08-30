<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4>{{ data.title }}</h4>
        <div class="row">
          <div class="col-xs-12">
            <small class="text-muted">{{ data.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.published_at }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.view_count }}阅读</small>
          </div>
        </div>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <p>
          <div class="row">
            <div class="col-xs-9">
              <span v-for="tag in data.tags">
                <span class="tag tag-default">{{ tag.name }}</span>
              </span>
            </div>
            <div class="col-xs-3 text-xs-right">
              <a href="#"><small class="text-muted">举报</small></a>
            </div>
          </div>
        </p>
        <div class="row">
          <div class="col-xs-12">
            <a :href="data.link" target="_blank">[ 阅读原文 ]</a>
          </div>
        </div>
        <hr>
        <div>
          {{0}}条精彩回复
          <p>
            暂无评论
          </p>
        </div>
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

    this.$http.get(`articles/${articleId}?`).then((response) => {
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
