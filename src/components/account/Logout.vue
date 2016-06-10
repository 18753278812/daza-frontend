<template>
  <div class="container">
    <h5>注销中...</h5>
  </div>
</template>

<script>
import { logout } from '../../vuex/actions';

export default {
  vuex: {
    actions: {
      logout,
    },
  },
  data() {
    return {
    };
  },
  ready() {
    setTimeout(() => {
      this.logout();
      this.$route.router.go('/');
    }, 500);
  },
};
</script>

<style scoped>
</style>
