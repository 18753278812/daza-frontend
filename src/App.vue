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
  font-family: "Hiragino Sans GB","Microsoft YaHei","黑体",Helvetica,Arial,Tahoma,sans-serif;
}
body > .container {
  padding-top: 70px;
  padding-bottom: 20px;
}
</style>
