<template>
  <form class="ui form error" novalidate @submit.prevent="submit()">
    <div class="inline fields" style="margin-bottom: 0px;">
      <div class="three wide field">
        <label>原密码</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="old_password"
          type="password"
          v-model="params.old_password">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
      </div>
      <div class="thirteen wide field" style="display: block;">
        <label>
          <router-link to="/account/password_forgot">忘记密码？</router-link>
        </label>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="inline fields">
      <div class="three wide field">
        <label>新密码</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="new_password"
          type="password"
          v-model="params.new_password">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>确认密码</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="new_password_confirmation"
          type="password"
          v-model="params.new_password_confirmation">
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui error message" v-if="failure">
      <div class="header">{{failure.message}}</div>
      <ul class="list">
        <li v-for="error in failure.errors">{{error.message}}</li>
      </ul>
    </div>
    <button class="ui primary button" type="submit">保存</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';

const NProgress = global.NProgress;
const toastr = global.toastr;

export default {
  data() {
    return {
      rules: {
      },
      params: {
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
      },
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
    success: state => state.account.settingsPassword.success,
    failure: state => state.account.settingsPassword.failure,
  }),
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('accountSettingsPasswordSubmit', this.params);
    },
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        NProgress.done();
        this.params = {
          old_password: '',
          new_password: '',
          new_password_confirmation: '',
        };
        toastr.success('保存成功。');
      }
    },
    failureWatcher() {
      NProgress.done();
    },
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
};
</script>

<style lang="scss" scoped>
</style>
