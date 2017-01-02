<template>
  <div class="ui main container">
    <h1 class="ui header">发表文章</h1>
    <div class="ui divider"></div>
    <form class="ui form" novalidate @submit.prevent="submit()">
      <div class="field">
        <label>主题：</label>
        <input
          type="text"
          name="topic_id"
          placeholder="选择一个主题">
      </div>
      <div class="field">
        <label>标题：</label>
        <input
          type="text"
          name="title"
          placeholder="请填写不小于2个字符的标题。">
      </div>
      <div class="field">
        <markdownEditor
          name="content"
          placeholder="请写入 Markdown 格式的正文，并且不能小于2个字符。"
          :value="content" :change="textChange"
        />
      </div>
      <div class="field">
        <label>标签：</label>
        <div class="ui tags fluid multiple search selection dropdown">
          <input name="tags" type="hidden">
          <i class="dropdown icon"></i>
          <div class="default text">&nbsp;</div>
          <div class="menu">
            <div class="item" data-value="angular">Angular</div>
            <div class="item" data-value="css">CSS</div>
            <div class="item" data-value="design">Graphic Design</div>
            <div class="item" data-value="ember">Ember</div>
            <div class="item" data-value="html">HTML</div>
            <div class="item" data-value="ia">Information Architecture</div>
            <div class="item" data-value="javascript">Javascript</div>
            <div class="item" data-value="mech">Mechanical Engineering</div>
            <div class="item" data-value="meteor">Meteor</div>
            <div class="item" data-value="node">NodeJS</div>
            <div class="item" data-value="plumbing">Plumbing</div>
            <div class="item" data-value="python">Python</div>
            <div class="item" data-value="rails">Rails</div>
            <div class="item" data-value="react">React</div>
            <div class="item" data-value="repair">Kitchen Repair</div>
            <div class="item" data-value="ruby">Ruby</div>
            <div class="item" data-value="ui">UI Design</div>
            <div class="item" data-value="ux">User Experience</div>
          </div>
        </div>
      </div>
      <button class="ui primary button" type="submit">确认</button>
    </form>
  </div>
</template>

<script>
import MarkdownEditor from '../../components/MarkdownEditor';

const $ = global.jQuery;

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      content: '### SimpleMDE',
    };
  },
  methods: {
    textChange(value) {
      this.content = value;
    },
    submit() {
    },
  },
  mounted() {
    $('.tags').dropdown({ allowAdditions: true });
  },
};
</script>

<style lang="scss" scoped>
</style>
