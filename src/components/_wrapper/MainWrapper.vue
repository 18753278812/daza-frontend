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
@media (min-width: 1200px) {
  .wrapper .container {
    width: 970px;
  }
}
.wrapper > .container {
  padding-top: 70px;
  padding-bottom: 20px;
}
</style>
