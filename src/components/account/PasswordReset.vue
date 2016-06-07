<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div class="text-center">
          <h3>重置密码</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="form-group">
              <label>将发送一封密码重置邮件到你的邮箱<br>点击按钮即可重置密码</label>
              <input class="form-control" type="email" name="email" placeholder="请输入邮箱" v-validate:email="rules.email">
            </div>
            <button type="submit" class="btn btn-primary btn-block" :disabled="!$validation.valid">发送验证邮件</button>
          </form>
        </validator>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        email: { required: true },
      },
    };
  },
};
</script>

<style scoped>
</style>
