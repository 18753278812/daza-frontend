<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-8">
            <h3>编辑文章</h3>
          </div>
          <div class="col-sm-4 text-sm-right">
            <button type="button" class="btn btn-secondary btn-sm" v-on:click="toggleExtraInputs()">显示更多填写内容</button>
          </div>
        </div>
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
                  class="img-thumbnail text-xs-right"
                  style="width: 180px; height: 180px;"
                  data-toggle="modal"
                  data-target="#asset-manager-dialog"
                  v-lazy="params.image_url | thumbnail">
              </div>
            </div>
            <div class="form-group">
              <label class="form-control-label">主题：</label>
              <select
                id="select2-topic"
                class="form-control"
                style="width: 100%"
                name="topic_id"
                v-model="params.topic_id"
                v-select2="params.topic_id"
                placeholder="选择一个主题"
                v-validate:topic_id="rules.topic_id">
                <option></option>
                <option v-for="topic in data.topics" :value="topic.id" :disabled="topic.type === 'feed'">{{ topic.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">标题：</label>
              <input
                class="form-control"
                type="text"
                name="title"
                placeholder="请填写不小于2个字符的标题。"
                v-model="params.title"
                v-validate:email="rules.title">
            </div>
            <div class="form-group">
              <label class="form-control-label">正文：</label>
              <textarea
                id="content-input"
                class="form-control"
                rows="15"
                name="content"
                placeholder="请写入 Markdown（本站使用了 CommonMark 规范） 格式的正文，并且不能小于2个字符。"
                v-model="params.content"
                v-validate:email="rules.content"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">标签：</label>
              <select
                id="select2-tags"
                class="form-control"
                style="width: 100%"
                name="tags"
                multiple="multiple"
                v-select2="params.tags"
                tags="true">
                <option v-for="tag in data.tags" track-by="name" :value="tag.name">{{ tag.name }}</option>
              </select>
            </div>
            <div class="form-group" v-if="data.extra_showed">
              <label for="name-input" class="form-control-label">位置信息：</label>
              <div class="row">
                <div class="col-md-8 col-xs-8">
                  <input
                    class="form-control"
                    type="text"
                    name="location"
                    placeholder="e.g. 深圳 . 南山图书馆"
                    v-model="params.location"
                    v-validate:location="rules.location">
                </div>
                <div class="col-md-2 col-xs-2" style="padding-left: 0;">
                  <input
                    class="form-control"
                    type="text"
                    name="longitude"
                    placeholder="经度"
                    v-model="params.longitude"
                    v-validate:longitude="rules.longitude">
                </div>
                <div class="col-md-2 col-xs-2" style="padding-left: 0;">
                  <input
                    class="form-control"
                    type="text"
                    name="latitude"
                    placeholder="纬度"
                    v-model="params.latitude"
                    v-validate:latitude="rules.latitude">
                </div>
              </div>
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
import shortid from 'shortid';
import NProgress from 'nprogress';
import SimpleMDE from 'simplemde';
import AssetManagerDialog from '../asset/AssetManagerDialog';
import { auth } from '../../vuex/getters';
import { getUserTopics, articleShow, articleUpdate } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getUserTopics,
      articleShow,
      articleUpdate,
    },
  },
  components: {
    AssetManagerDialog,
  },
  data() {
    return {
      data: {
        topics: [],
        tags: [],
        extra_showed: false,
      },
      rules: {
        topic_id: { required: true },
        title: { required: true, minlength: 2 },
        content: { required: true, minlength: 2 },
        location: {},
        longitude: {},
        latitude: {},
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
  ready() {
    const simplemde = new SimpleMDE({
      element: document.getElementById('content-input'),
    });
    simplemde.codemirror.on('change', () => {
      this.params.content = simplemde.value();
    });
    NProgress.start();
    this.getUserTopics(this.auth.id).then((data) => {
      this.data.topics = data.data;
      NProgress.done();
    });
    const articleId = this.$route.params.id;
    this.articleShow(articleId).then(data => {
      const article = data.data;
      const tags = [];
      if (article.tags != null) {
        this.data.tags = article.tags;
        article.tags.forEach((value) => {
          tags.push(value.name);
        });
      }
      this.params = {
        short_id: article.short_id,
        topic_id: article.topic_id,
        type: article.type,
        title: article.title,
        summary: article.summary,
        content_format: article.content_format,
        content: article.content,
        image_url: article.image_url,
        tags,
        location: article.location,
        longitude: article.longitude,
        latitude: article.latitude,
      };
      // this.params.topic_id = article.topic_id;
      simplemde.value(article.content);
    });
  },
  methods: {
    submit() {
      const articleId = this.$route.params.id;
      this.articleUpdate(articleId, this.params).then((data) => {
        if (data) {
          this.$route.router.go('/');
        }
      });
    },
    onAssetSelected(asset) {
      this.params.image_url = asset.url;
    },
    toggleExtraInputs() {
      this.data.extra_showed = !this.data.extra_showed;
    },
  },
};
</script>

<style scoped>
</style>
