<template>
  <div class="ui main container">
    <div class="ui active inverted dimmer">
      <div class="ui large text loader">注销中...</div>
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
    this.$store.dispatch('accountLogout').then(() => {
      setTimeout(() => {
        this.$router.push('/');
      }, 300);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
