<template>
  <router-view></router-view>
</template>

<script>
import 'nprogress/nprogress.css';
import 'toastr/build/toastr.css';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import 'simplemde/dist/simplemde.min.css';

export default {
};
</script>

<style lang="scss">
// SimpleMDE
.CodeMirror-fullscreen,
.editor-toolbar.fullscreen {
  z-index: 1050 !important;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.ui.container {
  width: 980px;
}
#wrapper {
  overflow: hidden;
  .main.container {
    padding-top: 70px;
    padding-bottom: 20px;
  }
  // 导航栏
  .navbar.menu {
    height: 50px;
    border: none;
    box-shadow: none;
    background-color: #f7f7f9;
    .item img.logo {
      width: auto;
      height: 16px;
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
  .navbar.inverted.menu {
    background-color: #37474f;
  }
  // Jumbotron
  .jumbotron.segment {
    background-color: #212121;
    min-height: 240px;
    margin-top: 50px;
    padding-top: 40px;
    h1.ui.header img {
      margin-right: 0px;
    }
  }
}
</style>
