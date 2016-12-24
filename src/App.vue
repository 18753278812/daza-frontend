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
  font-family: PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,STHeitiSC-Light,simsun,WenQuanYi Zen Hei,WenQuanYi Micro Hei,'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#wrapper {
  .main.container {
    padding-top: 6em;
    padding-bottom: 2em;
  }
  .ui.menu .item img.logo {
    width: auto;
    height: 18px;
    margin: 7px 0;
  }
}
</style>
