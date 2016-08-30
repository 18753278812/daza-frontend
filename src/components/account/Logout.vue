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
    this.logout().then(() => {
      setTimeout(() => {
        this.$route.router.go('/');
      }, 600);
    });
  },
};
</script>

<style scoped>
</style>
