<template>
  <div id="wrapper">
    <div class="ui sidebar inverted vertical labeled icon menu">
      <router-link class="item" to="/" exact>首页</router-link>
      <router-link class="item" to="/topics">主题</router-link>
    </div>
    <navbar-view :auth="auth" :counts="counts"></navbar-view>
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
    counts: 'counts',
  }),
};
</script>

<style lang="scss" scoped>
</style>
