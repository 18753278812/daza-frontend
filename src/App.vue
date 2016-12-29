<template>
  <router-view></router-view>
</template>

<script>
import 'nprogress/nprogress.css';
import 'toastr/build/toastr.css';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';

export default {
};
</script>

<style lang="scss">
* {
}
body {
  // background-color: #f3f4f4;
}
#wrapper {
  .main.container {
    padding-top: 90px;
    padding-bottom: 20px;
  }
  // 导航栏
  .navbar.menu {
    height: 60px;
    border: none;
    box-shadow: 0 1px 5px #dcdddd;
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
