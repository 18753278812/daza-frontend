<template>
  <div class="ui container">
    <form class="ui form">
      <div class="inline fields">
        <div class="three wide field">
          <label>原密码</label>
        </div>
        <div class="thirteen wide field">
          <input type="text">
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="inline fields">
        <div class="three wide field">
          <label>新密码</label>
        </div>
        <div class="thirteen wide field">
          <input type="text">
        </div>
      </div>
      <div class="inline fields">
        <div class="three wide field">
          <label>确认密码</label>
        </div>
        <div class="thirteen wide field">
          <input type="text">
        </div>
      </div>
      <div class="ui divider"></div>
      <button class="ui primary button" type="submit">保存</button>
    </form>
  </div>
</template>

<script>
// import NProgress from 'nprogress';

export default {
  data() {
    return {
      rules: {
      },
      params: {
      },
    };
  },
  methods: {
    submit() {
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
