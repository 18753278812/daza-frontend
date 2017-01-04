<template>
  <router-view></router-view>
</template>

<script>
import 'nprogress/nprogress.css';
import 'toastr/build/toastr.css';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import 'simplemde/dist/simplemde.min.css';

export default {
};
</script>

<style lang="scss">
// SimpleMDE
.CodeMirror-fullscreen,
.editor-toolbar.fullscreen {
  z-index: 1050 !important;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.ui.container {
  width: 980px;
}
#wrapper {
  overflow: hidden;
  .main.container {
    padding-top: 70px;
    padding-bottom: 20px;
  }
  // 导航栏
  .navbar.menu {
    height: 50px;
    border: none;
    box-shadow: none;
    background-color: #f7f7f9;
    .item img.logo {
      width: auto;
      height: 16px;
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
  .navbar.inverted.menu {
    background-color: #37474f;
  }
  // masthead
  .masthead.segment {
    background-color: #263238;
    min-height: 240px;
    margin-top: 50px;
    padding-top: 40px;
    h1.ui.header img {
      margin-right: 0px;
    }
  }
}

.topics {
  .item:first-child {
    border-top: none;
    margin-top: 0!important;
    padding-top: 0!important;
  }
  .item {
    border-top: 1px solid rgba(34,36,38,.15);
    padding: 1em 0;
    display: flex;
    .content {
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      margin-left: 10px;
      > .header {
        font-size: 17px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }
      > .description {
        margin-top: 0.6em;
        max-width: auto;
        color: rgba(0,0,0,.6);
      }
    }
    > .image {
      position: relative;
      -webkit-box-flex: 0;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
      display: block;
      float: none;
      width: 100px;
      height: 100px;
      background-color: #eceff1;
    }
    > .image > img {
      border: none;
      position: absolute;
      width: 100%;
      top: 50%;
      -ms-transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
}
.articles {
  .item:first-child {
    border-top: none;
    margin-top: 0!important;
    padding-top: 0!important;
  }
  .item {
    border-top: 1px solid rgba(34,36,38,.15);
    margin: 0;
    padding: 1em 0;
    .content {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      margin-bottom: 1em;
      > .intro {
        display: block;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        font-size: 1em;
        > .header {
          display: inline-block;
          font-size: 17px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);
        }
        > .description {
          margin-top: 0.6em;
          max-width: auto;
          color: rgba(0,0,0,.6);
        }
      }
      > .image {
        position: relative;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: 120px;
        height: 68px;
        overflow: hidden;
        border-radius: .3rem;
        background-color: #eceff1;
      }
      > .image > img {
        border: none;
        position: absolute;
        width: 100%;
        top: 50%;
        -ms-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .extra {
      font-size: 12px;
      color: #818a91;
    }
  }
}

// Mobile
@media (max-width: 768px) {
  .topics {
    .item {
      > .image {
        width: 80px;
        height: 80px;
      }
    }
  }
  .articles {
    .item {
      .content {
        > .image {
          width: 100px;
          height: 56px;
        }
      }
    }
  }
}
</style>
