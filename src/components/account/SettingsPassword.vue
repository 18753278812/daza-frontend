<template>
  <validator name="validation">
    <form novalidate @submit.prevent="submit()">
      <div class="form-group row">
        <label for="name-input" class="col-xs-3 col-sm-2 col-form-label">原密码</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="name-input"
            class="form-control"
            name="old_password"
            type="password"
            placeholder=""
            v-model="params.old_password"
            v-validate:old_password="rules.old_password">
          <a v-link="'/account/password_reset'">忘记密码？</a>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label for="city-input" class="col-xs-3 col-sm-2 col-form-label">新密码</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="city-input"
            class="form-control"
            name="new_password"
            type="password"
            placeholder=""
            v-model="params.new_password"
            v-validate:new_password="rules.new_password">
        </div>
      </div>
      <div class="form-group row">
        <label for="website-input" class="col-xs-3 col-sm-2 col-form-label">确认密码</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="website-input"
            class="form-control"
            name="new_password_confirmation"
            type="password"
            placeholder=""
            v-model="params.new_password_confirmation"
            v-validate:new_password_confirmation="rules.new_password_confirmation">
        </div>
      </div>
      <hr>
      <div class="form-group">
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="!$validation.valid">保存</button>
      </div>
    </form>
  </validator>
</template>

<script>
import toastr from 'toastr';
import { auth } from '../../vuex/getters';
import { passwordModify } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      passwordModify,
    },
  },
  data() {
    return {
      rules: {
        old_password: { required: true, minlength: 6, maxlength: 32 },
        new_password: { required: true, minlength: 6, maxlength: 32 },
        new_password_confirmation: { required: true, minlength: 6, maxlength: 32 },
      },
      params: {
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
      },
    };
  },
  ready() {
  },
  methods: {
    submit() {
      this.passwordModify(this.params).then(() => {
        toastr.success('密码修改成功');

        this.params = {
          old_password: '',
          new_password: '',
          new_password_confirmation: '',
        };
      });
    },
  },
};
</script>

<style scoped>
</style>
