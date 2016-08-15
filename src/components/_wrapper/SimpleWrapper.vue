<template>
  <div id="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
import SimpleNavbar from '../../components/_wrapper/SimpleNavbar';
import SimpleFooter from '../../components/_wrapper/SimpleFooter';

export default {
  components: {
    'navbar-view': SimpleNavbar,
    'footer-view': SimpleFooter,
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
