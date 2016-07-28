<template>
  <nav class="navbar navbar-fixed-top navbar-light bg-faded">
    <a class="navbar-brand" v-link="'/'">
      <img alt="Brand" src="../../assets/ic_logo_dark.png">
    </a>
  </nav>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.navbar-brand img {
  height: 14px;
  width: auto;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
