<template>
  <textarea
    id="markdown-editor"
   />
</template>

<script>
const SimpleMDE = global.SimpleMDE;
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
      simplemde: null,
    };
  },
  watch: {
    value(val, oldVal) {
      if (val !== null && oldVal === '') {
        this.simplemde.value(val);
      }
    },
  },
  mounted() {
    this.simplemde = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
      initialValue: this.value,
    });
    this.simplemde.codemirror.on('change', () => {
      this.change(this.simplemde.value());
    });
  },
};
</script>

<style scoped>
</style>
