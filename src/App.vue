<template>
  <router-view></router-view>
</template>

<script>
export default {
};
</script>

<style lang="scss">
html, body {
  font-size: 14px;
  font-family: "Open sans","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;
  background-color: #ECEFF1;
}
#wrapper {
  .bg-faded {
    background-color: #FFFFFF!important;
    box-shadow: 0 1px 2px rgba(0,0,0,.08);
  }
  .navbar {
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
