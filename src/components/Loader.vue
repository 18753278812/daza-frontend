<template>
  <div class="ui basic segment" v-if="!pagination">
    <div class="ui active loader"></div>
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    pagination: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
