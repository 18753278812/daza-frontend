<template>

  <h1 class="ui header">{{ data.title }}</h1>
  <p>{{ data.content }}</p>

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
h1 {
  color: #42b983;
}
</style>
