<template>
    <nav class="navbar navbar-default">
      <div class="navbar-header">
        <a class="navbar-brand" v-link="'/'">
          <img alt="Brand" src="../../assets/ic_logo_dark.png">
        </a>
      </div>
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
  margin-top: 3px;
}
</style>
