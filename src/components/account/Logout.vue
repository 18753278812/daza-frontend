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
