<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#profile" role="tab">基本资料</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#account" role="tab">账号和安全</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#notification" role="tab">推送消息设置</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane fade active in" id="profile" role="tabpanel">
            <settings-profile></settings-profile>
          </div>
          <div class="tab-pane" id="account" role="tabpanel">
            <settings-account></settings-account>
          </div>
          <div class="tab-pane" id="notification" role="tabpanel">
            <settings-notification></settings-notification>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import SettingsProfile from './SettingsProfile.vue';
import SettingsAccount from './SettingsAccount.vue';
import SettingsNotification from './SettingsNotification.vue';

export default {
  vuex: {
    getters: {
      auth,
    },
  },
  components: {
    SettingsProfile,
    SettingsAccount,
    SettingsNotification,
  },
  data() {
    return {
      user: this.auth.user,
    };
  },
};
</script>

<style scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
