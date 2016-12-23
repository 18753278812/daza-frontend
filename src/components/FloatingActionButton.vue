<template>
  <div class="btn-group-vertical">
    <button type="button" class="btn btn-secondary">1</button>
    <button type="button" class="btn btn-secondary">2</button>
  </div>
</template>

<script>
export default {
  name: 'floating-action-button',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-group-vertical {
  bottom: 60px;
  position: fixed;
  right: 20px;
  z-index: 1000;
}
</style>
