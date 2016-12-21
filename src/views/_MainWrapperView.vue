<template>
  <div id="wrapper">
    <navbar-view :auth="auth"></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default {
  computed: mapGetters({
    auth: 'auth',
  }),
  components: {
    'navbar-view': Navbar,
    'footer-view': Footer,
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  background-color: #ECEFF1;
}
</style>
