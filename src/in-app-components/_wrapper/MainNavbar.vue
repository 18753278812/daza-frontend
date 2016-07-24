<template>
  <p></p>
</template>

<script>
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
    },
  },
  data() {
    return {
    };
  },
  ready() {
  },
};
</script>

<style scoped>
</style>
