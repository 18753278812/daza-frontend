<template>
  <div class="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
import MainNavbar from '../../components/_wrapper/MainNavbar';
import MainFooter from '../../components/_wrapper/MainFooter';

export default {
  components: {
    'navbar-view': MainNavbar,
    'footer-view': MainFooter,
  },
  data() {
    return {
    };
  },
  ready() {
  },
};
</script>

<style>
.wrapper > .container {
  padding-top: 70px;
  padding-bottom: 20px;
}
</style>
