<template>
  <validator name="validation">
    <form novalidate onsubmit="return false;">
      <div class="form-group row">
        <div class="col-xs-12">
          <textarea
            id="source_link-input"
            class="form-control"
            rows="3"
            name="link"
            placeholder="将主题/文章链接粘贴到这里！"
            v-model="params.link"
            v-validate:source_link="rules.link"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-xs-12 text-xs-right">
          <a v-link="{ name: 'article_create' }"><small class="text-muted">发表原创文章</small></a>
          <button
            class="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#article-share-dialog"
            >&nbsp;&nbsp;分享&nbsp;&nbsp;</button>
        </div>
      </div>
    </form>
  </validator>
  <!-- Article share dialog -->
  <article-share-dialog :link="params.link"></article-share-dialog>
</template>

<script>
import { auth } from '../../vuex/getters';
import ArticleShareDialog from '../article/ArticleShareDialog';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
    },
  },
  components: {
    ArticleShareDialog,
  },
  data() {
    return {
      rules: {
        link: { required: true, url: true },
      },
      params: {
        link: '',
      },
    };
  },
  ready() {
  },
};
</script>

<style lang="scss" scoped>
</style>
