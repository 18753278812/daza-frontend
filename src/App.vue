<template>
  <router-view></router-view>
</template>

<script>
import store from './vuex/store';
import { auth } from './vuex/getters';
import { getProfile, getNotificationCounts } from './vuex/actions';

export default {
  store,
  vuex: {
    getters: {
      auth,
      counts: state => state.notifications.counts,
    },
    actions: {
      getProfile,
      getNotificationCounts,
    },
  },
  data() {
    return {
    };
  },
  created() {
    // 如果是生产环境，将默认跳转至 https
    if (process.env.NODE_ENV === 'production' && window.location.protocol !== 'https:') {
      window.location = window.location.href.replace('http://', 'https://');
    }
  },
  ready() {
    if (this.auth.check()) {
      const expiresIn = this.auth.jwt_token.expires_in;
      if (Math.floor(Date.now() / 1000) > expiresIn) {
        this.$route.router.go('/account/refresh_token');
        return;
      }
      // 获取未读通知数
      this.getNotificationCounts();
    }
  },
};
</script>

<style lang="scss">
html, body {
  font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 14px;
}

// SimpleMDE
.CodeMirror-fullscreen,
.editor-toolbar.fullscreen {
  z-index: 1050;
}

#wrapper {
  > .container {
    padding-top: 70px;
  }
  // 导航栏
  .bg-inverse {
    background-color: #37474F!important;
  }
  .search-form input[name='keyword'] {
    width: 250px;
  }
  .navbar-brand img {
    height: 1.2rem;
    width: auto;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .data-empty {
    padding-top: 25px;
    padding-bottom: 25px;
    div > p {
      margin-bottom: 0;
    }
  }
  // 文章列表
  .article-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    > .entry {
      a {
        color: #424242;
      }
      .content {
        float: left;
        width: calc(100%);
        .title {
          word-wrap: break-word;
          font-size: 16px;
          font-weight: 500;
        }
      }
      .content.haveimage {
        width: calc(100% - 125px);
      }
      .image {
        float: right;
        margin-left: 5px;
        width: 120px;
        height: 68px;
        position: relative;
        overflow: hidden;
        border-radius: .3rem;
        img {
          position: absolute;
          width: 100%;
          top: 50%;
          -ms-transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
      .extra {
        margin-top: 8px;
      }
    }
    > .entry:last-child {
      hr {
        margin-bottom: 5px;
      }
    }
  }
  // 文章详情
  .article-content {
    word-wrap: break-word;
    img {
      max-width: 100%;
    }
    img.twemoji {
      height: 1em;
      width: 1em;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
    }
    a {
      word-wrap: break-word;
    }
  }
  // 文章详情上方主题元素
  .article-content-top-topic {
    display: none;
  }
  // 文章详情侧边栏主题元素
  .article-content-side-topic {
    display: block;
  }
  // 评论列表
  .comment-list {
    list-style-type: none;
    padding: 0;
    > .entry {
      .avatar {
        width: 36px;
        display: table-cell;
        vertical-align: top;
        img {
          width: 32px;
          height: 32px;
        }
      }
      .content {
        display: table-cell;
        vertical-align: top;
        padding-left: 5px;
        p {
          font-size: 14px;
          margin-top: 2px;
          margin-bottom: 2px;
        }
      }
    }
  }

  // Extra small devices (portrait phones, less than 544px)
  @media (max-width: 543px) {
    > .container {
      padding-top: 60px;
    }
    // 导航栏
    .search-form {
      display: none;
    }
    // 文章列表
    .article-list {
      > .entry {
        .content.haveimage {
          width: calc(100% - 105px);
        }
        .image {
          width: 100px;
          height: 56px;
        }
      }
    }
    // 文章详情上方主题元素
    .article-content-top-topic {
      display: block;
    }
    // 文章详情侧边栏主题元素
    .article-content-side-topic {
      display: none;
    }
  }

  // Small devices (landscape phones, 544px and up)
  @media (min-width: 544px) and (max-width: 767px) {
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) and (max-width: 991px) {
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) and (max-width: 1199px) {
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
    .container {
      width: 980px;
    }
  }
}
</style>
