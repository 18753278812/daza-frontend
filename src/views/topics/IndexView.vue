<template>
  <div class="ui main container">
    <div class="ui items">
      <div class="item" v-for="item in lists">
        <a class="ui small image">
          <img :src="item.image_url">
        </a>
        <div class="content">
          <router-link class="header" :to="{ name: 'topic_detail', params: { slug: item.id } }">{{item.name}}</router-link>
          <div class="description">
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    lists: state => state.topics.lists,
  }),
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('topicGetLists');
  },
};
</script>

<style lang="scss" scoped>
</style>
