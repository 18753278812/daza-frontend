<template>
  <div class="social">
    <h3 class="ui header">关注我们</h3>
    <div>
      <button id="wechat" class="ui circular green icon button">
        <i class="wechat icon"></i>
      </button>
      <a href="https://weibo.com/lijy91" target="_blank">
        <button class="ui circular red icon button">
          <i class="weibo icon"></i>
        </button>
      </a>
      <a href="https://github.com/lijy91" target="_blank">
        <button class="ui circular alternate icon button">
          <i class="github alternate icon"></i>
        </button>
      </a>
  </div>
</template>

<script>
const $ = global.jQuery;

export default {
  props: {
  },
  mounted() {
    $('#wechat')
      .popup({
        position: 'top center',
        target: '#wechat',
        html: '<h2 class="ui center aligned icon header">打开微信扫一扫<img class="ui medium image" src="/static/images/qrcode_wx.jpg" /></h2>',
      });
  },
};
</script>

<style lang="scss" scoped>
.social {
  border: 1px dashed #d3d7db;
  padding: 16px;
  margin-top: 10px
}
</style>
