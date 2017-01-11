<template>
  <div class="ui main container">
    <div class="ui active inverted dimmer">
      <div class="ui large text loader">注销中...</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const NProgress = global.NProgress;

export default {
  data() {
    return {
    };
  },
  computed: mapState({
    success: state => state.account.logout.success,
    failure: state => state.account.logout.failure,
  }),
  methods: {
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        NProgress.done();
        this.$router.push('/');
      }
    },
    failureWatcher() {
      NProgress.done();
    },
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  beforeCreate() {
    this.$store.dispatch('accountLogoutInit');
  },
  mounted() {
    NProgress.start();
    this.$store.dispatch('accountLogoutSubmit');
  },
};
</script>

<style lang="scss" scoped>
</style>
