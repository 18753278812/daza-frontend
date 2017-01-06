<template>
  <div class="markdown-body" v-html="markdownText">
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
  name: 'markdown-view',
  props: {
    text: {
      type: String,
    },
    format: {
      type: String,
    },
  },
  computed: {
    markdownText() {
      if (this.format === 'html') {
        if (this.text.startsWith('<![CDATA[') || this.text.endsWith(']]>')) {
          return this.text.replace('<![CDATA[', '').replace(']]>', '');
        }
        return this.text;
      }
      return marked(this.text, { sanitize: true });
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
