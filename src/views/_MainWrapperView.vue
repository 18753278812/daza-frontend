<template>
  <div id="wrapper">
    <div class="ui sidebar inverted vertical labeled icon menu">
      <router-link class="item" to="/" exact>首页</router-link>
      <router-link class="item" to="/topics">主题</router-link>
    </div>
    <navbar-view :auth="auth" :counts="counts"></navbar-view>
    <router-view></router-view>
    <footer-view></footer-view>
    <floating-action-button></floating-action-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';

// const daovoice = global.daovoice;

export default {
  components: {
    'navbar-view': Navbar,
    'footer-view': Footer,
    'floating-action-button': FloatingActionButton,
  },
  computed: mapGetters({
    auth: 'auth',
    counts: 'counts',
  }),
  mounted() {
    // const options = {
    //   app_id: process.env.DAOVOICE_APPID,
    // };
    // // 如果用户已经登录，传入用户信息到 DaoVoice
    // if (this.auth.check()) {
    //   const user = this.auth.user;
    //   Object.assign(options, {
    //     user_id: String(user.id),
    //     email: user.email,
    //     name: user.name,
    //     signed_up: Math.floor(new Date(user.created_at).getTime() / 1000),
    //   });
    // }
    // daovoice('init', options);
    // daovoice('update');
  },
};
</script>

<style lang="scss" scoped>
</style>
