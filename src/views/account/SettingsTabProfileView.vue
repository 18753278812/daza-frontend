<template>
  <form class="ui form error" novalidate @submit.prevent="submit()">
    <assetPickerView
      :show="pickerShow"
      :targetType="'user'"
      :targetId="auth.id"
      :callback="pickerCallback" />
    <div class="inline fields">
      <div class="three wide field">
        <label>头像</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="avatar_url"
          type="hidden"
          v-model="params.avatar_url" />
        <imageView class="ui set-avatar image" :src="params.avatar_url" />
        <div>
          <button class="ui mini basic button" type="button" v-on:click="pickerToggle">
            选择头像
          </button>
          <div class="ui checkbox" style="display: block; margin-top: 5px;">
            <input
              type="checkbox"
              name="use_gravatar"
              v-model="params.use_gravatar">
            <label>使用 <a href="https://cn.gravatar.com/">Gravatar</a></label>
          </div>
        </div>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="inline fields">
      <div class="three wide field">
        <label>用户名</label>
      </div>
      <div class="thirteen wide field">
        <label>{{auth.user.username}}</label>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>邮箱</label>
      </div>
      <div class="thirteen wide field">
        <label>{{auth.user.email}}</label>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="inline fields">
      <div class="three wide field">
        <label>姓名</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="name"
          type="text"
          placeholder="添加你的姓名"
          v-model="params.name">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>城市</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="city"
          type="text"
          placeholder="添加你的城市"
          v-model="params.city">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>网站</label>
      </div>
      <div class="thirteen wide field">
        <input
          name="website"
          type="url"
          placeholder="添加你的网站"
          v-model="params.website">
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>简介</label>
      </div>
      <div class="thirteen wide field">
        <textarea
          rows="3"
          name="bio"
          placeholder="在你的个人资料页中添加简介"
          v-model="params.bio"></textarea>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NProgress from 'nprogress';
import ImageView from '../../components/ImageView';
import AssetPickerView from '../../views/assets/PickerView';

const toastr = global.toastr;

export default {
  components: {
    ImageView,
    AssetPickerView,
  },
  data() {
    return {
      rules: {
      },
      params: {
        avatar_url: '',
        use_gravatar: false,
        name: '',
        city: '',
        website: '',
        bio: '',
      },
      pickerShow: false,
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
    success: state => state.account.settingsProfile.success,
    failure: state => state.account.settingsProfile.failure,
  }),
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('accountSettingsProfileSubmit', this.params);
    },
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        NProgress.done();
        toastr.success('保存成功。');
      }
    },
    failureWatcher() {
      NProgress.done();
    },
    pickerToggle() {
      this.pickerShow = !this.pickerShow;
    },
    pickerCallback(asset) {
      if (!asset) {
        return;
      }
      this.params.avatar_url = asset.url;
      this.params.use_gravatar = false;
    },
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  mounted() {
    const user = this.auth.user;
    this.params = {
      avatar_url: user.avatar_url,
      use_gravatar: user.use_gravatar,
      name: user.name,
      city: user.city,
      website: user.website,
      bio: user.bio,
    };
  },
};
</script>

<style lang="scss" scoped>
.set-avatar.image {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  padding: .25rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: .25rem;
}
.ui.form .inline.fields .wide.field > label {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
