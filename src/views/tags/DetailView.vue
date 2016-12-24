<template>
  <div class="ui main container">
    tag{{ entity }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    entity: state => state.tags.entity,
  }),
  data() {
    return {
    };
  },
  mounted() {
    const name = this.$route.params.name;
    this.$store.dispatch('tagGetEntity', name);
  },
};
</script>

<style lang="scss" scoped>
</style>
