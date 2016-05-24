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
    const postId = this.$route.params.id;

    this.$http.get(`v1/posts/${postId}?`).then((response) => {
      this.data = response.data.data;
      console.log(this.data);
    }, () => { });
  },
};
</script>

<style scoped>
</style>
