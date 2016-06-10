<template>
  <router-view></router-view>
</template>

<script>
import store from './vuex/store';

export default {
  store,
  data() {
    return {
    };
  },
  ready() {
  },
};
</script>

<style>
body,button, input, select, textarea,h1 ,h2, h3, h4, h5, h6 {
  font-family: "Open sans","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;
}
</style>
