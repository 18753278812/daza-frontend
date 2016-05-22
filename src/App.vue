<template>
  <navbar-view></navbar-view>

  <router-view></router-view>

  <footer-view></footer-view>
</template>

<script>
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';

export default {
  components: {
    'navbar-view': Navbar,
    'footer-view': Footer,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
