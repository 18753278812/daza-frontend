<template>
  <div class="ui main container">
    <assetPickerView
      :show="pickerShow"
      :targetType="'topic'"
      :targetId="params.short_id"
      :callback="pickerCallback" />
    <h1 class="ui header">新建主题</h1>
    <form class="ui form error" novalidate @submit.prevent="submit()">
      <div class="field">
        <h2 class="ui center aligned icon header">
          <a href="#" class="ui centered bordered rounded medium image" v-on:click="pickerToggle">
            <imageView
              :src="params.image_url"
              :width="300"
              :height="300"
              >
          </a>
        </h2>
      </div>
      <div class="field">
        <label>分类：</label>
        <select
          class="ui selection dropdown"
          name="category_id"
          v-model="params.category_id">
          <option value="">选择一个分类</option>
          <option v-for="item in categories.lists" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="field">
        <label>类型：</label>
        <select
          class="ui selection dropdown"
          name="type"
          v-model="params.type">
          <option value="">选择主题的类型</option>
          <option value="original">原创</option>
          <option value="feed">聚合内容</option>
        </select>
      </div>
      <div class="field" v-bind:style="{ display: params.type == 'feed' ? 'block' : 'none' }">
        <label>聚合内容来源：</label>
        <div class="fields">
          <div class="four wide field">
            <select
              class="ui selection dropdown"
              name="source_format"
              placeholder="来源格式"
              v-model="params.source_format">
              <option value="">请选择</option>
              <option value="rss+xml">rss+xml</option>
              <option value="atom+xml">atom+xml</option>
            </select>
          </div>
          <div class="twelve wide field">
            <input
              type="text"
              name="source_link"
              placeholder="来源链接"
              v-model="params.source_link">
          </div>
        </div>
      </div>
      <div class="field">
        <label>名称：</label>
        <input
          type="text"
          name="name"
          placeholder="请填写不小于2个字符的名称。"
          v-model="params.name">
      </div>
      <div class="field">
        <label>描述：</label>
        <textarea
          type="text"
          name="description"
          rows="3"
          placeholder="请填写不小于2个字符的描述。"
          v-model="params.description">
      </div>
      <div class="field">
        <label>主页：</label>
        <input
          type="text"
          name="website"
          v-model="params.website">
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
import ImageView from '../../components/ImageView';
import AssetPickerView from '../../views/assets/PickerView';

const $ = global.jQuery;
const NProgress = global.NProgress;

export default {
  components: {
    ImageView,
    AssetPickerView,
  },
  data() {
    return {
      rules: {
      },
      params: {
        short_id: shortid.generate(),
        category_id: '',
        type: '',
        website: '',
        source_format: '',
        source_link: '',
        name: '',
        image_url: '',
        description: '',
      },
      pickerShow: false,
    };
  },
  computed: mapState({
    categories: state => state.topics.create.categories,
    success: state => state.topics.create.success,
    failure: state => state.topics.create.failure,
  }),
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('topicCreateSubmit', this.params);
    },
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        NProgress.done();
        this.$router.push('/topics');
      }
    },
    failureWatcher() {
      NProgress.done();
    },
    pickerToggle() {
      this.pickerShow = !this.pickerShow;
    },
    pickerCallback(asset) {
      if (!asset) {
        return;
      }
      this.params.image_url = asset.url;
    },
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  beforeCreate() {
    this.$store.dispatch('topicCreateInit');
  },
  mounted() {
    $('.selection.dropdown').dropdown();
  },
};
</script>

<style lang="scss" scoped>
</style>
