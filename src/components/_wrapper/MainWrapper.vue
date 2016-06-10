<template>
  <navbar-view></navbar-view>

  <router-view></router-view>

  <footer-view></footer-view>
</template>

<script>
import MainNavbar from '../../components/_wrapper/MainNavbar';
import MainFooter from '../../components/_wrapper/MainFooter';

export default {
  components: {
    'navbar-view': MainNavbar,
    'footer-view': MainFooter,
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
