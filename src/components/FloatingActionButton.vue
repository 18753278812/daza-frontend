<template>
  <div class="ui vertical labeled icon menu" style="display: none;">
    <a class="item">
      <i class="gamepad icon"></i>
      Games
    </a>
    <a class="item">
      <i class="video camera icon"></i>
      Channels
    </a>
    <a class="item">
      <i class="video play icon"></i>
      Videos
    </a>
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
.menu {
  bottom: 100px;
  position: fixed;
  right: 20px;
  z-index: 1000;
}
</style>
