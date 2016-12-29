<template>
  <div class="markdown-body" v-html="markdownContent">
  </div>
</template>

<script>
import marked from 'marked';
import highlightJs from 'highlight.js';

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight(code) {
    return highlightJs.highlightAuto(code).value;
  },
});

export default {
  name: 'loader',
  props: {
    content: {
      type: String,
    },
  },
  computed: {
    markdownContent() {
      return marked(this.content, { sanitize: true });
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
