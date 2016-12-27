<template>
  <div class="ui list">
    <div class="item" v-for="item in data">
      <div class="header">
        <router-link :to="{ name: 'topic_detail', params: { slug: item.id } }">{{item.name}}</router-link>
      </div>
      {{item.description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-topics',
  props: {
    data: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
