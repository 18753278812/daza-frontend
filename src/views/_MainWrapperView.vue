<template>
  <div id="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarClean from '../components/NavbarClean';

export default {
  components: {
    'navbar-view': NavbarClean,
  },
};
</script>

<style>
</style>
