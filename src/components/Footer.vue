<template>
  <footer>
    <div class="container">
      <div class="navigation">
        <div class="row">
          <div class="col-xs-4">
          </div>
          <div class="col-xs-4">
          </div>
          <div class="col-xs-4">
          </div>
        </div>
      </div>
      <div class="copyright">
        <div class="row">
          <div class="col-xs-6">
            &copy; daza.io 2016 - 2017。
          </div>
          <div class="col-xs-6 text-xs-right">
            <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备15047595号-2</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
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
