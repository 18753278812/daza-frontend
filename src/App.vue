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
  // 导航栏
  .navbar.menu {
    height: 60px;
    .item img.logo {
      width: auto;
      height: 18px;
      margin: 7px 0;
    }
  }
  // Jumbotron
  .jumbotron.segment {
    background-color: #212121;
    min-height: 240px;
    margin-top: 60px;
    padding-top: 40px;
    h1.ui.header img {
      margin-right: 0px;
    }
  }
}
</style>
