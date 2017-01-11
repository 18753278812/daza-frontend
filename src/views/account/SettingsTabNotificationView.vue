<template>
  <form class="ui form error" novalidate @submit.prevent="submit()">
    <h2 class="ui header">
      <div class="sub header">你可以在这里设置接收的消息类型。</div>
    </h2>
    <div class="inline fields">
      <div class="three wide field">
        <label>有人关注了我</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_followed"
              value="true"
              v-model="params.notification_followed">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_followed"
              value="false"
              v-model="params.notification_followed">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>订阅了我的主题</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_subscribed"
              value="true"
              v-model="params.notification_subscribed">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_subscribed"
              value="false"
              v-model="params.notification_subscribed">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>赞了我的文章</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_upvoted"
              value="true"
              v-model="params.notification_upvoted">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_upvoted"
              value="false"
              v-model="params.notification_upvoted">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>评论我</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_comment"
              value="true"
              v-model="params.notification_comment">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_comment"
              value="false"
              v-model="params.notification_comment">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>提及我</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_mention"
              value="true"
              v-model="params.notification_mention">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="notification_mention"
              value="false"
              v-model="params.notification_mention">
            <label>关闭</label>
          </div>
        </div>
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
        notification_followed: 'true',
        notification_subscribed: 'true',
        notification_upvoted: 'true',
        notification_comment: 'true',
        notification_mention: 'true',
      },
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
    success: state => state.account.settingsNotification.success,
    failure: state => state.account.settingsNotification.failure,
  }),
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('accountSettingsNotificationSubmit', this.params);
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
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  mounted() {
    const configs = this.auth.configs;
    if (configs instanceof Array) {
      configs.forEach((value) => {
        this.params[value.key] = value.value;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.ui.form .inline.fields .wide.field > div {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
