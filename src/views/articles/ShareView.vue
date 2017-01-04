<template>
  <div class="ui main container">
    <h1 class="ui header">分享文章</h1>
    <form class="ui form error" novalidate @submit.prevent="submit()">
      <div class="field">
        <label>主题：</label>
        <input
          type="text"
          name="topic_id"
          placeholder="选择一个主题"
          v-model="params.topic_id">
      </div>
      <div class="field">
        <label>链接：</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. https://daza.io/articles/example"
          v-model="params.link">
      </div>
      <div class="field">
        <label>标题：</label>
        <input
          type="text"
          name="title"
          placeholder="请填写不小于2个字符的标题。"
          v-model="params.title">
      </div>
      <div class="field">
        <label>摘要：</label>
        <textarea
          type="text"
          name="summary"
          rows="3"
          placeholder="请填写不小于2个字符的摘要。"
          v-model="params.summary">
        </textarea>
      </div>
      <div class="field">
        <label>标签：</label>
        <div class="ui tags fluid multiple search selection dropdown">
          <input name="tags" type="hidden">
          <i class="dropdown icon"></i>
          <div class="default text">&nbsp;</div>
          <div class="menu">
          </div>
        </div>
      </div>
      <div class="ui error message" v-if="failure">
        <div class="header">{{failure.message}}</div>
        <ul class="list">
          <li v-for="error in failure.errors">{{error.message}}</li>
        </ul>
      </div>
      <button class="ui primary button" type="submit">确认</button>
    </form>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import shortid from 'shortid';
import NProgress from 'nprogress';
import MarkdownEditor from '../../components/MarkdownEditor';

const $ = global.jQuery;

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      rules: {
      },
      params: {
        short_id: shortid.generate(),
        topic_id: '',
        type: 'share',
        link: '',
        title: '',
        summary: '',
        tags: '',
      },
    };
  },
  computed: mapState({
    success: state => state.articles.create.success,
    failure: state => state.articles.create.failure,
  }),
  methods: {
    textChange(value) {
      this.params.content = value;
    },
    submit() {
      NProgress.start();
      this.$store.dispatch('articleCreateSubmit', this.params);
    },
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        NProgress.done();
        this.$router.push({ name: 'topic_detail', params: { slug: this.params.topic_id } });
      }
    },
    failureWatcher() {
      NProgress.done();
    },
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  beforeCreate() {
    this.$store.dispatch('articleCreateInit');
  },
  mounted() {
    $('.tags').dropdown({ allowAdditions: true });
  },
};
</script>

<style lang="scss" scoped>
</style>
