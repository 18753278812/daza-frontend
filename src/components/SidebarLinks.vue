<template>
  <div class="ui list">
    <div class="item" v-for="item in data">
      <div class="header">{{item.title}}</div>
      {{item.summary}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-links',
  props: {
    data: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
