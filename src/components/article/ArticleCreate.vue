<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3>发表文章</h3>
        <hr>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <select class="form-control">
                <option>Default select</option>
              </select>
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                name="title"
                placeholder="标题"
                v-model="title"
                v-validate:email="rules.title">
            </div>
            <div class="form-group">
              <textarea
                id="content-input"
                class="form-control"
                rows="15"
                name="summary"
                placeholder="正文"
                v-model="summary"
                v-validate:email="rules.summary"></textarea>
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
