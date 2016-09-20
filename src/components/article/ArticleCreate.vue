<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-8">
            <h3>发表文章</h3>
          </div>
          <div class="col-sm-4 text-sm-right">
            <button type="button" class="btn btn-secondary btn-sm" v-on:click="toggleExtraInputs()">显示更多填写内容</button>
          </div>
        </div>
        <hr>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <label class="form-control-label">主题：</label>
              <select
                id="select2-topic"
                class="form-control"
                style="width: 100%"
                name="topic_id"
                v-model="params.topic_id"
                v-select2="params.topic_id"
                :options="{ placeholder: '选择一个主题' }"
                v-validate:topic_id="rules.topic_id">
                <option></option>
                <option v-for="topic in data.topics" :value="topic.id">{{ topic.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">标题：</label>
              <input
                class="form-control"
                type="text"
                name="title"
                placeholder="请填写不小于6个字符的标题。"
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
                placeholder="请写入 Markdown（本站使用了 CommonMark 规范） 格式的正文，并且不能小于32个字符。"
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
                :options="{ tags: true }">
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
</template>

<script>
import shortid from 'shortid';
import { auth } from '../../vuex/getters';
import { getUserTopics, articleCreate } from '../../vuex/actions';
// import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getUserTopics,
      articleCreate,
    },
  },
  data() {
    return {
      data: {
        topics: [],
        extra_showed: false,
      },
      rules: {
        topic_id: { required: true },
        title: { required: true, minlength: 6 },
        content: { required: true, minlength: 32 },
        location: {},
        longitude: {},
        latitude: {},
      },
      params: {
        topic_id: '',
        guid: shortid.generate(),
        type: 'original',
        title: '',
        summary: '',
        content: '',
        tags: '',
        location: '',
        longitude: '',
        latitude: '',
      },
    };
  },
  ready() {
    this.getUserTopics(this.auth.id).then((data) => {
      if (data) {
        this.data.topics = data;
      }
    });
  },
  methods: {
    submit() {
      this.articleCreate(this.params).then((data) => {
        if (data) {
          this.$route.router.go('/');
        }
      });
    },
    toggleExtraInputs() {
      this.data.extra_showed = !this.data.extra_showed;
    },
  },
};
</script>

<style scoped>
</style>
