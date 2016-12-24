<template>
  <div class="ui main container">
    user
    <div v-if="entity == null">NULL</div>
    {{ entity }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    entity: state => state.users.entity,
  }),
  data() {
    return {
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('userGetEntity', id);
  },
};
</script>

<style lang="scss" scoped>
</style>
