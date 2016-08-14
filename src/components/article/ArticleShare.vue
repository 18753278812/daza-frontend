<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3>分享文章</h3>
        <hr>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group row">
              <label for="topic-input" class="col-xs-2 col-form-label">主题</label>
              <div class="col-xs-10">
                <select class="form-control">
                  <option>Default select</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="title-input" class="col-xs-2 col-form-label">标题</label>
              <div class="col-xs-10">
                <input
                  class="form-control"
                  type="text"
                  name="title"
                  placeholder=""
                  v-model="title"
                  v-validate:email="rules.title">
              </div>
            </div>
            <div class="form-group row">
              <label for="link-input" class="col-xs-2 col-form-label">链接</label>
              <div class="col-xs-10">
                <input
                  class="form-control"
                  type="text"
                  name="link"
                  placeholder=""
                  v-model="link"
                  v-validate:email="rules.link">
              </div>
            </div>
            <div class="form-group row">
              <label for="summary-input" class="col-xs-2 col-form-label">摘要</label>
              <div class="col-xs-10">
                <textarea
                  id="summary-input"
                  class="form-control"
                  rows="3"
                  name="summary"
                  placeholder=""
                  v-model="summary"
                  v-validate:email="rules.summary"></textarea>
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
export default {
  data() {
    return {
      rules: {
        title: { required: true },
        link: { required: true },
        summary: { required: true, minlength: 15 },
      },
    };
  },
  ready() {
  },
};
</script>

<style scoped>
</style>
