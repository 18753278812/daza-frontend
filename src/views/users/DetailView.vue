<template>
  <div>
    <div class="ui jumbotron inverted vertical center aligned segment">
      <div v-if="entity">
        <h1 class="ui inverted header">
          <img class="ui tiny circular image" :src="entity.avatar_url">
        </h1>
        <h1 class="ui inverted header">
          {{entity.name}}
        </h1>
        <div class="sub header">{{ entity.bio }}</div>
      </div>
    </div>
    <div class="ui main container">
      user
      <div v-if="entity == null">NULL</div>
      {{ entity }}
    </div>
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
