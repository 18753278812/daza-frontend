<template>
  </style>
  <div class="container">
    <h4>{{ data.title }}</h4>
    <hr>
    <p>{{{ data.content }}}</p>
    <hr>
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
<style scoped>
</style>
