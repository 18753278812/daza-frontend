<template>
  <div class="ui form">
    <div class="inline fields">
      <div class="three wide field">
        <label>头像</label>
      </div>
      <div class="thirteen wide field">
        <input type="text">
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="inline fields">
      <div class="three wide field">
        <label>用户名</label>
      </div>
      <div class="thirteen wide field">
        <input type="text">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>邮箱</label>
      </div>
      <div class="thirteen wide field">
        <input type="text">
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="inline fields">
      <div class="three wide field">
        <label>姓名</label>
      </div>
      <div class="thirteen wide field">
        <input type="text">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>城市</label>
      </div>
      <div class="thirteen wide field">
        <input type="text">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>网站</label>
      </div>
      <div class="thirteen wide field">
        <input type="text">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>简介</label>
      </div>
      <div class="thirteen wide field">
        <textarea rows="3"></textarea>
      </div>
    </div>
    <div class="ui divider"></div>
    <button class="ui primary button" type="submit">保存</button>
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
