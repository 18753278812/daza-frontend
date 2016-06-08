<template>
  <navbar-view></navbar-view>
  <router-view></router-view>
  <footer-view></footer-view>
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
    console.log('simpleWrapper');
  },
};
</script>

<style scoped>
</style>
