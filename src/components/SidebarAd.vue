<template>
  <div class="ui ad card" v-if="data !== null">
    <div class="image">
      <img v-bind:src="data.image_url">
    </div>
    <div class="content">
      <a class="header" :href="data.link" target="_blank">{{ data.title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-ad',
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.ad.card {
  width: 100%;
}
</style>
