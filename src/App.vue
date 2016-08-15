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

<style lang="scss">
html, body {
  font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 14px;
}

#wrapper {
  .bg-inverse {
    background-color: #37474F;
  }
  .navbar-brand img {
    height: 1.2rem;
    width: auto;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
}
#wrapper > {
  .container {
    padding-top: 70px;
    padding-bottom: 20px;

  }
}
</style>
