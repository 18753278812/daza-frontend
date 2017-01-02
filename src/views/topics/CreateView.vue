<template>
  <div class="ui main container">
    <h1 class="ui header">新建主题</h1>
    <div class="ui divider"></div>
    <form class="ui form" novalidate @submit.prevent="submit()">
      <div class="field">
        <label>分类：</label>
        <input
          type="text"
          name="category_id"
          placeholder="选择一个分类">
      </div>
      <div class="field">
        <label>类型：</label>
        <input
          type="text"
          name="type"
          placeholder="选择主题的类型">
      </div>
      <div class="field">
        <label>名称：</label>
        <input
          type="text"
          name="name"
          placeholder="请填写不小于2个字符的标题。">
      </div>
      <div class="field">
        <label>描述：</label>
        <textarea
          type="text"
          name="name"
          rows="3"
          placeholder="请填写不小于2个字符的描述。">
      </div>
      <div class="field">
        <label>主页：</label>
        <input
          type="text"
          name="website">
      </div>
      <button class="ui primary button" type="submit">确认</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
