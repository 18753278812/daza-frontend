<template>
  <div>
    <div class="ui inverted vertical footer segment" style="background-color: #212121;">
      <div class="ui sections container">
        <div class="ui grid">
          <div class="six wide column">
            <h4 class="ui inverted header">
              <img class="ui tiny qrcode image" src="../assets/ic_logo_light.png">
            </h4>
            <p class="description">
              「daza.io」是一款基于技能树（正在实现）的技术内容聚合应用，根据你的技能对内容进行筛选，让你在这个信息过载的时代里更高效地获取你所需的内容。
            </p>
            <div class="ui inverted bulleted horizontal link list">
              <router-link class="item" to="/articles/about">关于我们</router-link>
              <router-link class="item" to="/topics/help">帮助中心</router-link>
              <router-link class="item" to="/articles/sources">获取源码</router-link>
              <router-link class="item" to="/articles/contact">联系站长</router-link>
              <router-link class="item" to="/articles/feedback">建议反馈</router-link>
            </div>
          </div>
          <div class="four wide column">
            <p></p>
          </div>
          <div class="four wide column">
            <p></p>
          </div>
          <div class="two wide right aligned column">
            <h4 class="ui inverted header">客户端下载</h4>
            <div class="ui inverted link list">
              <a class="item" href="http://a.app.qq.com/o/simple.jsp?pkgname=io.daza.app" target="_blank">
                <img class="ui tiny qrcode image" src="/static/images/download_qrcode.png">
              </a>
              <p>iOS &amp; Android</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui inverted vertical footer segment">
      <div class="ui copyright container">
        <div class="ui two column centered doubling grid">
          <div class="column">
            &copy; 2017 <a href="https://daza.io" target="_blank">daza.io</a> All Rights Reserved.
          </div>
          <div class="right aligned column">
            <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备15047595号-2</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.sections.container {
  padding-top: 10px;
  font-size: 13px;
  .description{
    color: rgba(255, 255, 255, 0.5);
  }
  .link.list {
    .item {
      padding: 4px 0;
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
    }
    .item::before {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .qrcode.image {
    // width: 110px;
  }
}
.copyright.container {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  a {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
