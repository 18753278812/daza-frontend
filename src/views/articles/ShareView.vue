<template>
  <div class="ui main container">
    <h1 class="ui header">分享文章</h1>
    <form class="ui form error" novalidate v-on:submit.prevent>
      <div class="field">
        <label>主题：</label>
        <select
          class="ui selection dropdown"
          name="topic_id"
          v-model="params.topic_id">
          <option value="">选择一个主题</option>
          <option v-for="item in topics.lists" :value="item.id">{{item.name}}</option>
        </select>
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
        <div class="ui fluid multiple search selection dropdown" id="tags">
          <input
            name="tags"
            type="hidden"
            v-model="params.tags">
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
      <button class="ui primary button" type="button" v-on:click="submit($event)">确认</button>
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
        topic_id: 0,
        type: 'share',
        link: '',
        title: '',
        summary: '',
        image_url: '',
        tags: '',
      },
    };
  },
  computed: mapState({
    topics: state => state.articles.create.topics,
    success: state => state.articles.create.success,
    failure: state => state.articles.create.failure,
  }),
  methods: {
    textChange(value) {
      this.params.content = value;
    },
    submit(e) {
      // 判断是否为按了Enter键，防止在输入标签时被提交
      if (e != null && e.keyCode === 13) {
        return;
      }
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
    tagsOnChange(value) {
      this.params.tags = value;
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
    $('select.dropdown').dropdown();
    $('#tags').dropdown({
      allowAdditions: true,
      onChange: this.tagsOnChange,
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
