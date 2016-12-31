<template>
  <textarea id="markdown-editor"/>
</template>

<script>
import SimpleMDE from 'simplemde';

const document = global.document;

export default {
  props: {
    value: {
      type: String,
    },
    change: {
      type: Function,
    },
  },
  computed: {
  },
  data() {
    return {
    };
  },
  mounted() {
    const simplemde = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
      initialValue: this.value,
    });
    simplemde.codemirror.on('change', () => {
      this.change(simplemde.value());
    });
  },
};
</script>

<style scoped>
</style>
