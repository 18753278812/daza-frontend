<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3 class="text-sm-center">注销中...</h3>
      </div>
    </div>
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
    }, 2500);
  },
};
</script>

<style scoped>
</style>
