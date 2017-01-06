<template>
  <div id="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarClean from '../components/NavbarClean';

export default {
  components: {
    'navbar-view': NavbarClean,
  },
};
</script>

<style lang="scss">
#in-app-wrapper {
  overflow: hidden;
  .main.container {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
