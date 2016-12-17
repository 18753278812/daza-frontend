<template>
  <div id="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default {
  components: {
    'navbar-view': Navbar,
    'footer-view': Footer,
  },
};
</script>

<style>
</style>
