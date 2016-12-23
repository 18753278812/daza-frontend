<template>
  <div class="ui inverted vertical footer segment">
    <div class="ui container">
      <div class="ui stackable inverted divided equal height stackable grid">
        <div class="three wide column">
          <h4 class="ui inverted header">About</h4>
          <div class="ui inverted link list">
            <a href="#" class="item">Sitemap</a>
            <a href="#" class="item">Contact Us</a>
            <a href="#" class="item">Religious Ceremonies</a>
            <a href="#" class="item">Gazebo Plans</a>
          </div>
        </div>
        <div class="three wide column">
          <h4 class="ui inverted header">Services</h4>
          <div class="ui inverted link list">
            <a href="#" class="item">Banana Pre-Order</a>
            <a href="#" class="item">DNA FAQ</a>
            <a href="#" class="item">How To Access</a>
            <a href="#" class="item">Favorite X-Men</a>
          </div>
        </div>
        <div class="seven wide column">
          <h4 class="ui inverted header">&copy; daza.io 2016 - 2017。</h4>
          <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备15047595号-2</a>
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
footer {
  font-size: 12px;
  background-color: #263238;
  .navigation {
    min-height: 120px;
  }
  .copyright {
    color: #757575;
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px dashed rgba(255,255,255,.1);
    a {
      color: #757575;
    }
  }
}
</style>
