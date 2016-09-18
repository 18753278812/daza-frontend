<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3>发表文章</h3>
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
                name="summary"
                placeholder="正文"
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
      },
      rules: {
        title: { required: true },
        content: { required: true, minlength: 150 },
      },
      params: {
        topic_id: 1,
        title: '',
        summary: '',
        content: '',
        tags: '',
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
  },
};
</script>

<style scoped>
</style>
