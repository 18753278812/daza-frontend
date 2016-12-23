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
html, body {
  font-family: "Open sans","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;
}
#wrapper {
  .main.container {
    padding-top: 6em;
  }
  .ui.menu .item img.logo {
    width: auto;
    height: 18px;
    margin: 7px 0;
  }
}
</style>
