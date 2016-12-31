<template>
  <div class="ui main container">
    <div class="ui tabular menu">
      <a class="item active" data-tab="profile">基本资料</a>
      <a class="item" data-tab="password">密码</a>
      <a class="item" data-tab="notification">消息设置</a>
    </div>
    <div class="ui tab active" data-tab="profile">
      <settingsProfile />
    </div>
    <div class="ui tab" data-tab="password">
      <settingsPassword />
    </div>
    <div class="ui tab" data-tab="notification">
      <settingsNotification />
    </div>
  </div>
</template>

<script>
import SettingsProfile from './SettingsProfileView';
import SettingsPassword from './SettingsPasswordView';
import SettingsNotification from './SettingsNotificationView';

const $ = global.jQuery;

export default {
  components: {
    SettingsProfile,
    SettingsPassword,
    SettingsNotification,
  },
  data() {
    return {
    };
  },
  mounted() {
    $('.menu .item').tab();
  },
};
</script>

<style lang="scss" scoped>
</style>
