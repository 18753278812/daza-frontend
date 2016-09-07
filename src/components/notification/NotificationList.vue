<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>全部消息</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
    },
  },
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
