<template>
  <div class="ui main container">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    {{ lists }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    lists: state => state.categories.lists,
  }),
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('categoryGetLists');
  },
};
</script>

<style lang="scss" scoped>
</style>
