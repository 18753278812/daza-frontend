<template>
  <div id="wrapper">
    <div class="ui black big launch right attached fixed button" v-on:click="toggleSidebar">
      <i class="content icon"></i>
    </div>
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

const $ = global.jQuery;

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
  methods: {
    toggleSidebar() {
      $('.ui.sidebar').sidebar('toggle');
    },
  },
};
</script>

<style lang="scss" scoped>
#wrapper .fixed.launch.button {
  position: fixed;
  bottom: 20px;
  left: 0px;

  width: 50px;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  -webkit-transition:
    0.3s width ease,
    0.5s transform ease
  ;
  -moz-transition:
    0.3s width ease,
    0.5s transform ease
  ;
  -o-transition:
    0.3s width ease,
    0.5s transform ease
  ;
  -ms-transition:
    0.3s width ease,
    0.5s transform ease
  ;
  transition:
    0.3s width ease,
    0.5s transform ease
  ;
  z-index: 1100 !important;
}
#wrapper .launch.button .icon {
  margin-left: 0px;
}

// Desktop
@media (min-width: 1199px) {
  #wrapper .fixed.launch.button {
    display: none !important;
  }
}
</style>
