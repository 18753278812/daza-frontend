<template>
  <div class="ui main container">
    <h1 class="ui header">修改文章</h1>
    <form class="ui form error" novalidate @submit.prevent="submit()">
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
        <markdownEditor
          name="content"
          placeholder="请写入 Markdown 格式的正文，并且不能小于2个字符。"
          :value="params.content" :change="textChange"
        />
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
        type: 'original',
        title: '',
        summary: '',
        content_format: 'markdown',
        content: '',
        image_url: '',
        tags: '',
        location: '',
        longitude: '',
        latitude: '',
      },
    };
  },
  computed: mapState({
    topics: state => state.articles.edit.topics,
    article: state => state.articles.edit.article,
    success: state => state.articles.edit.success,
    failure: state => state.articles.edit.failure,
  }),
  methods: {
    textChange(value) {
      this.params.content = value;
    },
    submit() {
      NProgress.start();
      this.$store.dispatch('articleEditSubmit', this.params);
    },
    articleWatcher(val, oldVal) {
      if (val !== null && oldVal === null) {
        const tags = [];
        if (val.tags !== null) {
          val.tags.forEach((value) => {
            tags.push(value.name);
          });
        }
        this.params = {
          short_id: val.short_id,
          topic_id: val.topic_id,
          type: val.type,
          title: val.title,
          summary: val.summary,
          content_format: val.content_format,
          content: val.content,
          image_url: val.image_url,
          tags,
          location: val.location,
          longitude: val.longitude,
          latitude: val.latitude,
        };
        NProgress.done();
      }
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
    article: 'articleWatcher',
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  beforeCreate() {
    NProgress.start();
    const articleId = this.$route.params.slug;
    this.$store.dispatch('articleEditInit', articleId);
  },
  mounted() {
    $('select.dropdown').dropdown();
    $('.tags').dropdown({ allowAdditions: true });
  },
};
</script>

<style lang="scss" scoped>
</style>
