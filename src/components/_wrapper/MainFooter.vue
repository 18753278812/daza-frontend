<template>
  <footer class="footer">
    <div class="container">
      <hr>
      <div class="row">
        <div class="col-xs-6 text-xs-left">
          <span class="text-muted">© daza.io 2016</span>
        </div>
        <div class="col-xs-6 text-xs-right">
          <a href="http://www.miitbeian.gov.cn/"><span class="text-muted">粤ICP备15047595号-2</span></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.footer {
  min-height: 50px;
  line-height: 50px;
  > .container > hr {
    margin-bottom: 0px;
  }
}
</style>
