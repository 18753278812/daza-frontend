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
body {
  font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
}
body > .container {
  padding-top: 70px;
  padding-bottom: 20px;
}
.navbar-brand img {
  height: 14px;
  width: auto;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
