<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h3 class="text-xs-center">重新登录中...</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from '../../vuex/actions';

export default {
  vuex: {
    actions: {
      getProfile,
    },
  },
  data() {
    return {
    };
  },
  ready() {
    this.getProfile().then(() => {
      setTimeout(() => {
        this.$route.router.go('/');
      }, 600);
    });
  },
};
</script>

<style scoped>
</style>
