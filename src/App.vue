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
  font-size: 14px;
  font-family: "Open sans","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;
}
#wrapper {
  .bg-white {
    background-color: #FFFFFF!important;
    box-shadow: 1px 1px 2px #eeeeee;
  }
  .navbar {
    padding: 0.8rem 0.8rem;
    .navbar-brand img {
      height: 1.2rem;
      width: auto;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
    }
  }
  > .container {
    padding-top: 70px;
    min-height: 600px;
  }
}
</style>
