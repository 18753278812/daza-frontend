<template>
  <navbar-view></navbar-view>

  <div class="ui main container">
    <router-view></router-view>
  </div>

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
.main.container {
  margin-top: 7em;
}
</style>
