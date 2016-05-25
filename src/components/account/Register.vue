<template>
  <div class="ui grid">
    <div class="column">
      <h2 class="ui header">
        <div class="content">
          注册
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="email" name="email" placeholder="请输入邮箱">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="请输入密码">
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" name="example">
              <label>我已阅读并同意《服务协议》和《隐私权协议》</label>
            </div>
          </div>
          <button  type="submit" class="fluid ui primary button">注册</button>
        </div>

        <div class="ui error message"></div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
};
</script>

<style scoped>
</style>
