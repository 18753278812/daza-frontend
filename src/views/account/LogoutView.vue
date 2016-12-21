<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h3 class="text-xs-center">注销中...</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('logout').then(() => {
      setTimeout(() => {
        this.$router.push('/');
      }, 300);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
