<template>
  <div id="wrapper">
    <navbar-view :auth="auth"></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
    <floating-action-button></floating-action-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';

export default {
  components: {
    'navbar-view': Navbar,
    'footer-view': Footer,
    'floating-action-button': FloatingActionButton,
  },
  computed: mapGetters({
    auth: 'auth',
  }),
};
</script>

<style lang="scss" scoped>
</style>
