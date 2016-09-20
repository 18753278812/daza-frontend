<template>
  <router-view></router-view>
</template>

<script>
import store from './vuex/store';

export default {
  store,
  vuex: {
    getters: {
    },
    actions: {
    },
  },
  data() {
    return {
    };
  },
  ready() {
  },
};
</script>

<style lang="scss">
html, body {
  font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 14px;
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
  // 文章列表
  .article-list {
    list-style-type: none;
    padding: 0;
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
        padding-left: 5px;
        img {
          width: 120px;
          height: 68px;
        }
      }
      .extra {
        margin-top: 8px;
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
          img {
            width: 100px;
            height: 56px;
          }
        }
      }
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

#alert {
  position: fixed;
  max-width: 400px;
  margin-left: 12px;
  top: 12px;
  right: 12px;
  z-index: 9999;
     -moz-box-shadow: 0 0 12px #999999;
  -webkit-box-shadow: 0 0 12px #999999;
          box-shadow: 0 0 12px #999999;
}
</style>
