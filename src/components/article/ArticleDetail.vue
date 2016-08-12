<template>
  <div class="container">
    <h4>{{ data.title }}</h4>
    <hr>
    <p class="article-content">{{{ data.content }}}</p>
    <hr>
    <div>
      由 [daza.io] 转码以便移动设备阅读
    </div>
    <a href="{{ data.link }}">查看原文</a>
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
