<template>
  <div id="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
  components: {
    'navbar-view': Navbar,
  },
};
</script>

<style>
</style>
