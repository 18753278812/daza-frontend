<template>
  <div class="ui main text container" v-if="entity">
    <h1 class="ui header">{{entity.title}}</h1>
    <div class="ui divider"></div>
    <markdown-view
      :text="entity.content"
      :format="entity.content_format" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MarkdownView from '../../components/MarkdownView';

export default {
  components: {
    MarkdownView,
  },
  computed: mapState({
    entity: state => state.articles.entity,
  }),
  data() {
    return {
    };
  },
  mounted() {
    const id = this.$route.params.slug;
    this.$store.dispatch('articleGetEntity', id);
  },
};
</script>

<style lang="scss" scoped>
</style>
