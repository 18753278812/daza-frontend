<template>
  <div class="ui main container">
    notifications
    {{ lists }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    lists: state => state.notifications.lists,
  }),
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('notificationGetLists');
  },
};
</script>

<style lang="scss" scoped>
</style>
