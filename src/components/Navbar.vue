<template>
  <div class="ui navbar tiny borderless inverted fixed menu">
    <div class="ui container">
      <div class="header item">
        <router-link to="/" style="height: 32px;">
          <img class="logo" src="../assets/ic_logo_light.png">
        </router-link>
      </div>
      <div class="left menu">
        <router-link class="item" to="/" exact>首页</router-link>
        <router-link class="item" to="/categories">分类</router-link>
        <router-link class="item" to="/topics">主题</router-link>
      </div>
      <div class="right menu" v-if="auth.check()">
        <router-link
          class="item"
          to="/notifications">
          通知 <a class="ui red circular label" v-if="counts.unread_count > 0">{{counts.unread_count}}</a>
        </router-link>
        <div class="ui simple dropdown item">
          分享 <i class="dropdown icon"></i>
          <div class="menu">
            <router-link to="/topics/create" class="item">创建主题</router-link>
            <div class="ui divider"></div>
            <router-link to="/articles/create" class="item">发表文章</router-link>
            <router-link to="/articles/share" class="item">分享文章</router-link>
          </div>
        </div>
        <div class="ui simple dropdown item">
          <imageView
            class="ui avatar image"
            :src="auth.user.avatar_url"
            :width="25"
            :height="25"
          />
          <span>{{ auth.user.name }}</span>
          <i class="dropdown icon"></i>
          <div class="ui vertical menu">
            <router-link class="item" :to="{ name: 'user_detail', params: { id: auth.id } }">查看个人主页</router-link>
            <div class="ui divider"></div>
            <router-link class="item" to="/topics/help">帮助</router-link>
            <div class="ui divider"></div>
            <router-link class="item" to="/account/settings">设置</router-link>
            <router-link class="item" to="/account/logout">退出登录</router-link>
          </div>
        </div>
      </div>
      <div class="right menu" v-if="!auth.check()">
        <router-link
          class="item"
          to="/account/register">
          创建账号
        </router-link>
        <div class="item">
          <router-link
            class="ui positive button"
            tag="button"
            to="/account/login" >
            登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from './ImageView';

export default {
  name: 'navbar',
  components: {
    ImageView,
  },
  props: {
    auth: {
      type: Object,
      required: true,
    },
    counts: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.left.menu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.left.menu .active {
}

.menu .item > .label {
    margin-left: 4px;
}

// Mobile
@media (max-width: 768px) {
  .left.menu {
    display: none!important;
  }
}
// Tablet
@media (min-width: 768px) and (max-width: 991px) {
  .left.menu {
    margin-left: 20px !important;
  }
}
</style>
