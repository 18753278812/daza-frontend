<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <h1 class="text-xs-center">跳转中...</h1>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  ready() {
    const site = process.env.DOMAIN_NAME;
    const keyword = this.$route.query.keyword;
    window.location.href = `https://www.google.com/search?q=site:${site}+${keyword}`;
  },
};
</script>

<style scoped>
</style>
