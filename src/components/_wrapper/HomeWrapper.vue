<template>
  <navbar-view></navbar-view>

  <router-view></router-view>

  <footer-view></footer-view>
</template>

<script>
import HomeNavbar from '../../components/_wrapper/HomeNavbar';
import HomeFooter from '../../components/_wrapper/HomeFooter';

export default {
  components: {
    'navbar-view': HomeNavbar,
    'footer-view': HomeFooter,
  },
  data() {
    return {
    };
  },
  ready() {
    console.log('homeWrapper');
  },
};
</script>

<style scoped>
</style>
