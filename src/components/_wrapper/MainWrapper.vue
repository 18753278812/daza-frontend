<template>
  <div id="wrapper">
    <navbar-view></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
  <!-- Shortcut cheat sheet -->
  <div class="modal fade" id="shortcut-cheat-sheet" tabindex="-1" role="dialog" aria-labelledby="shortcut-cheat-sheet-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="shortcut-cheat-sheet-label">键盘快捷键</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 text-xs-center">
              <p>功能开发中，敬请期待</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '../../components/_wrapper/MainNavbar';
import MainFooter from '../../components/_wrapper/MainFooter';
import daovoice from 'daovoice';
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
    },
  },
  components: {
    'navbar-view': MainNavbar,
    'footer-view': MainFooter,
  },
  data() {
    return {
    };
  },
  ready() {
    const options = {
      app_id: process.env.DAOVOICE_APPID,
    };
    // 如果用户已经登录，传入用户信息到 DaoVoice
    if (this.auth.check()) {
      const user = this.auth.user;
      Object.assign(options, {
        user_id: String(user.id),
        email: user.email,
        name: user.name,
        signed_up: Math.floor(new Date(user.created_at).getTime() / 1000),
      });
    }
    daovoice('init', options);
    daovoice('update');
  },
};
</script>

<style scoped>
</style>
