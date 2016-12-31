<template>
  <div class="ui main container">
    <markdownEditor :value="value" :change="textChange"/>

    <pre>{{value2}}</pre>
    <pre>{{value}}</pre>
  </div>
</template>

<script>
import MarkdownEditor from '../../components/MarkdownEditor';

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      value: '### SimpleMDE',
      value2: '',
    };
  },
  methods: {
    textChange(value) {
      this.value2 = value;
      this.value = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
