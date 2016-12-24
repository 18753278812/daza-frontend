<template>
  <router-view></router-view>
</template>

<script>
import 'nprogress/nprogress.css';
import 'toastr/build/toastr.css';

export default {
};
</script>

<style lang="scss">
#wrapper {
  .main.container {
    padding-top: 80px;
    padding-bottom: 20px;
  }
  .navbar.menu {
    height: 60px;
    .item img.logo {
      width: auto;
      height: 18px;
      margin: 7px 0;
    }
  }
}
</style>
