<template>
  <div class="ui main container">
    <div class="ui tabular menu">
      <a class="item active" data-tab="profile">基本资料</a>
      <a class="item" data-tab="password">密码</a>
      <a class="item" data-tab="notification">消息设置</a>
    </div>
    <div class="ui tab active" data-tab="profile">
      <settingsTabProfile />
    </div>
    <div class="ui tab" data-tab="password">
      <settingsTabPassword />
    </div>
    <div class="ui tab" data-tab="notification">
      <settingsTabNotification />
    </div>
  </div>
</template>

<script>
import SettingsTabProfile from './SettingsTabProfileView';
import SettingsTabPassword from './SettingsTabPasswordView';
import SettingsTabNotification from './SettingsTabNotificationView';

const $ = global.jQuery;

export default {
  components: {
    SettingsTabProfile,
    SettingsTabPassword,
    SettingsTabNotification,
  },
  data() {
    return {
    };
  },
  beforeCreate() {
    this.$store.dispatch('accountSettingsInit');
  },
  mounted() {
    $('.menu .item').tab();
  },
};
</script>

<style lang="scss" scoped>
</style>
