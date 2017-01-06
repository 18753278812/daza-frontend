<template>
  <div class="ui basic center aligned segment" v-if="active">
    <div class="ui active loader"></div>
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    active: {
      type: Boolean,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.segment {
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
