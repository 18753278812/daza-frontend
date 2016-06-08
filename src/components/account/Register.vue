<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div class="text-center">
          <h3>注册</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="form-group">
              <input class="form-control" type="email" name="email" placeholder="请输入邮箱" v-validate:email="rules.email">
            </div>
            <div class="form-group">
              <input class="form-control" type="password" name="password" placeholder="请输入密码" v-validate:password="rules.password">
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox"> 我已阅读并同意《<a href="#">用户隐私条款</a>》
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-block" :disabled="!$validation.valid">注册</button>
          </form>
        </validator>
        <div class="text-center">
          已有账号？<a v-link="'/account/login'">点此登录</a>
        </div>
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
        password: { required: true, minlength: 6, maxlength: 32 },
      },
    };
  },
};
</script>

<style scoped>
</style>
