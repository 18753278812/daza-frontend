<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3>新建主题</h3>
        <hr>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group row">
              <div class="col-sm-12 text-xs-center">
                <input
                  id="avatar_url-input"
                  class="form-control"
                  name="image_url"
                  type="hidden"
                  v-model="params.image_url" />
                <img
                  class="lazy img-thumbnail text-xs-right"
                  style="width: 180px; height: 180px;"
                  data-toggle="modal"
                  data-target="#asset-manager-dialog"
                  :data-original="params.image_url | thumbnail">
              </div>
            </div>
            <div class="form-group">
              <label class="form-control-label">分类：</label>
              <select
                id="select2-category"
                class="form-control"
                name="category_id"
                v-model="params.category_id"
                v-select2="params.category_id"
                placeholder="选择一个分类"
                v-validate:category_id="rules.category_id">
                <option></option>
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">类型：</label>
              <select
                id="select2-type"
                class="form-control"
                name="type"
                v-model="params.type"
                v-select2="params.type"
                placeholder="选择主题的类型"
                v-validate:type="rules.type">
                <option></option>
                <option value="original">原创</option>
                <option value="feed">聚合内容</option>
              </select>
            </div>
            <div class="form-group" v-if="params.type === 'feed'">
              <label for="name-input" class="form-control-label">聚合内容来源：</label>
              <div class="row">
                <div class="col-md-3 col-xs-4">
                  <select
                    id="select2-type"
                    class="form-control"
                    name="source_format"
                    v-model="params.source_format"
                    v-select2="params.source_format"
                    placeholder="来源格式"
                    v-validate:source_format="rules.source_format">
                    <option></option>
                    <option value="rss+xml">rss+xml</option>
                    <option value="atom+xml">atom+xml</option>
                  </select>
                </div>
                <div class="col-md-9 col-xs-8" style="padding-left: 0;">
                  <input
                    class="form-control"
                    type="text"
                    name="source_link"
                    placeholder="来源链接"
                    v-model="params.source_link"
                    v-validate:name="rules.source_link">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="name-input" class="form-control-label">名称：</label>
              <input
                class="form-control"
                type="text"
                name="name"
                placeholder="请填写不小于2个字符的标题。"
                v-model="params.name"
                v-validate:name="rules.name">
            </div>
            <div class="form-group">
              <label for="description-input" class="form-control-label">描述：</label>
              <textarea
                id="description-input"
                class="form-control"
                rows="3"
                name="description"
                placeholder="请填写不小于10个字符的描述。"
                v-model="params.description"
                v-validate:description="rules.description"></textarea>
            </div>
            <div class="form-group">
              <label for="name-input" class="form-control-label">主页：</label>
              <input
                class="form-control"
                type="text"
                name="website"
                placeholder=""
                v-model="params.website"
                v-validate:website="rules.website">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="!$validation.valid">确认</button>
            </div>
          </form>
        </validator>
      </div>
    </div>
  </div>
  <!-- Asset manager dialog -->
  <asset-manager-dialog
    :target_type="'topic'"
    :target_id="params.short_id"
    :callback="onAssetSelected"
    ></asset-manager-dialog>
</template>

<script>
import $ from 'jquery';
import shortid from 'shortid';
import NProgress from 'nprogress';
import AssetManagerDialog from '../asset/AssetManagerDialog';
import { auth } from '../../vuex/getters';
import { getCategoryList, topicCreate } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
      categories: state => state.categories.all,
    },
    actions: {
      getCategoryList,
      topicCreate,
    },
  },
  data() {
    return {
      rules: {
        category_id: { required: true },
        type: { required: true },
        source_format: { },
        source_link: { },
        name: { required: true, minlength: 2 },
        description: { required: true, minlength: 10 },
        website: { },
      },
      params: {
        short_id: shortid.generate(),
        category_id: '',
        type: '',
        source_format: '',
        source_link: '',
        name: '',
        image_url: '',
        description: '',
      },
    };
  },
  watch: {
    'params.image_url': () => {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    // 加载分类
    if (this.categories.length === 0) {
      NProgress.start();
      this.getCategoryList().then(() => {
        NProgress.done();
      });
    }
  },
  methods: {
    submit() {
      this.topicCreate(this.params).then(() => {
        this.$route.router.go('/');
      });
    },
    onAssetSelected(asset) {
      this.params.image_url = asset.url;
    },
  },
  components: {
    AssetManagerDialog,
  },
};
</script>

<style scoped>
</style>
