<template>
  <router-view></router-view>
  <!-- <div class="container">
    <div id="alert" class="alert alert-success alert-dismissible fade in" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="alert-heading">Well done!</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <p class="m-b-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
  </div> -->
</template>

<script>
import store from './vuex/store';
import daovoice from 'daovoice';

export default {
  store,
  data() {
    return {
    };
  },
  ready() {
    daovoice('init', {
      app_id: process.env.DAOVOICE_APPID,
    });

    daovoice('update');
  },
};
</script>

<style lang="scss">
html, body {
  font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 14px;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
/* Rules for sizing the icon. */
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

/* Rules for using icons as black on a light background. */
.material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
.material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

/* Rules for using icons as white on a dark background. */
.material-icons.md-light { color: rgba(255, 255, 255, 1); }
.material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }

#wrapper {
  > .container {
    padding-top: 70px;
  }
  // 导航栏
  .bg-inverse {
    background-color: #37474F;
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
        width: 10000px;
        display: table-cell;
        vertical-align: top;
        .title {
          font-size: 16px;
          font-weight: 500;
        }
      }
      .image {
        display: table-cell;
        vertical-align: top;
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
      padding-top: 55px;
    }
    // 导航栏
    .search-form {
      display: none;
    }
    // 文章列表
    .article-list {
      > .entry {
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
