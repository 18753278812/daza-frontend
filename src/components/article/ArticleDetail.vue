<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <h4>{{ data.title }}</h4>
        <div class="row">
          <div class="col-xs-9">
            <small class="text-muted">{{ data.author }}</small>
            <small class="text-muted">发表于 </small>
            <small class="text-muted">{{ data.published_at }}</small>
            <small class="text-muted"> · </small>
            <small class="text-muted">{{ data.view_count }}阅读</small>
          </div>
          <div class="col-xs-3 text-xs-right">
            <a v-bind:href="data.link" target="_blank"><small class="text-muted">原文链接</small></a>
          </div>
        </div>
        <hr>
        <p class="article-content">{{{ data.content }}}</p>
        <div class="row">
          <div class="col-xs-9">
            <span v-for="tag in data.tags">
              <span class="tag tag-default" v-link="{ name: 'tag_detail', params: { name: tag.name } }">{{ tag.name }}</span>
            </span>
          </div>
          <div class="col-xs-3 text-xs-right">
            <a href="#"><small class="text-muted">举报</small></a>
          </div>
        </div>
        <hr>
        <div>
          {{0}}条精彩回复
          <p>
            暂无评论
          </p>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <form>
              <div class="form-group">
                <textarea
                  class="form-control"
                  rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">确认</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <img class="card-img-top" :src="data.topic.image_url" alt="Card image cap" style="display: none;">
              <div class="card-block">
                <a v-link="{ name: 'topic_detail', params: { id: data.topic.id } }">
                  <h4 class="card-title">{{ data.topic.name }}</h4>
                </a>
                <div class="row">
                  <div class="col-xs-8">
                    <small class="text-muted">主题由 <a v-link="{ name: 'user_detail', params: { id: data.topic.user.id } }">{{ data.topic.user.name }}</a> 维护</small>
                  </div>
                  <div class="col-xs-4 text-xs-right">
                    <small class="text-muted">{{ data.topic.subscriber_count }}订阅</small>
                  </div>
                </div>
                <hr>
                <p class="card-text">{{ data.topic.description }}</p>
                <a href="#" class="btn btn-primary">订阅</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: {},
    };
  },
  ready() {
    const articleId = this.$route.params.id;
    this.$http.get(`v1/articles/${articleId}?`).then((response) => {
      this.data = response.data.data;
      console.log(this.data);
    }, () => { });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.article-content img {
  max-width: 100%;
}
.article-content img.twemoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
