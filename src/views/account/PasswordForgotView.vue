<template>
  <div class="ui main container">
    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-4 col-sm-6">
        <h3 class="text-xs-center">重置密码</h3>
        <div class="validator">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <label>我们将发送一封密码重置邮件到你的邮箱<br>点击按钮即可重置密码</label>
              <input
                class="form-control"
                type="email"
                name="email"
                placeholder="请输入邮箱">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">发送验证邮件</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-4 col-sm-3"></div>
    </div>
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
