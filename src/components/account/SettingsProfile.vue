<template>
  <validator name="validation">
    <form novalidate @submit.prevent="submit()">
      <div class="form-group row">
        <label for="avatar-input" class="col-xs-3 col-sm-2">头像</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="avatar_url-input"
            class="form-control"
            name="avatar_url"
            type="hidden"
            v-model="params.avatar_url" />
          <img
            class="img-thumbnail"
            style="width: 80px; height: 80px; float: left"
            v-lazy="params.avatar_url">
          <div style="margin-top: 10px; margin-left: 10px; float: left">
            <button type="submit" class="btn btn-sm btn-secondary">选择头像</button>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  id="use-gravatar-input"
                  class="form-check-input"
                  type="checkbox"
                  name="use_gravatar"
                  v-model="params.use_gravatar"> 使用 <a href="https://cn.gravatar.com/">Gravatar</a>
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label for="username-input" class="col-xs-3 col-sm-2 col-form-label">用户名</label>
        <div class="col-xs-9 col-sm-10">
          <p class="form-control-static">{{ auth.user.username }}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="email-input" class="col-xs-3 col-sm-2 col-form-label">邮箱</label>
        <div class="col-xs-9 col-sm-10">
          <label class="form-control-static">{{ auth.user.email }}</label>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label for="name-input" class="col-xs-3 col-sm-2 col-form-label">姓名</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="name-input"
            class="form-control"
            name="name"
            type="name"
            placeholder="添加你的姓名"
            v-model="params.name"
            v-validate:name="rules.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="city-input" class="col-xs-3 col-sm-2 col-form-label">城市</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="city-input"
            class="form-control"
            name="city"
            type="text"
            placeholder="添加你的城市"
            v-model="params.city"
            v-validate:city="rules.city">
        </div>
      </div>
      <div class="form-group row">
        <label for="website-input" class="col-xs-3 col-sm-2 col-form-label">网站</label>
        <div class="col-xs-9 col-sm-10">
          <input
            id="website-input"
            class="form-control"
            name="website"
            type="url"
            placeholder="添加你的网站"
            v-model="params.website"
            v-validate:website="rules.website">
        </div>
      </div>
      <div class="form-group row">
        <label for="bio-input" class="col-xs-3 col-sm-2 col-form-label">简介</label>
        <div class="col-xs-9 col-sm-10">
          <textarea
            id="bio-input"
            class="form-control"
            rows="3"
            name="bio"
            placeholder="在你的个人资料页中添加简介"
            v-model="params.bio"
            v-validate:bio="rules.bio"></textarea>
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
import { auth } from '../../vuex/getters';
import { updateProfile } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      updateProfile,
    },
  },
  data() {
    return {
      rules: {
        name: { required: true },
        city: { required: true },
        website: { required: true, url: true },
        bio: { },
      },
      params: {
        avatar_url: this.auth.user.avatar_url,
        use_gravatar: this.auth.user.use_gravatar,
        name: this.auth.user.name,
        city: this.auth.user.city,
        website: this.auth.user.website,
        bio: this.auth.user.bio,
      },
    };
  },
  ready() {
  },
  methods: {
    submit() {
      this.updateProfile(this.params).then(() => {
        this.$route.router.go('/');
      });
    },
  },
};
</script>

<style scoped>
</style>
