<template>
  <div class="ui grid">
    <div class="column">
      <h2 class="ui header">
        <div class="content">
          注册
        </div>
      </h2>
      <validator name="validation">
        <form class="ui large form" novalidate>
          <div class="ui stacked">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" name="email" placeholder="请输入邮箱" v-validate:email="rules.email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="请输入密码" v-validate:password="rules.password">
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" name="example">
                <label>我已阅读并同意《服务协议》和《隐私权协议》</label>
              </div>
            </div>
            <button  type="submit" class="fluid ui primary button {{ $validation.valid ? '' : 'disabled'}}">注册</button>
          </div>

          <div class="ui error message"></div>

        </form>
      </validator>
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
