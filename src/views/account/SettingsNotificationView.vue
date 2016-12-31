<template>
  <form class="ui form">
    <h2 class="ui header">
      <div class="sub header">你可以在这里设置接收的消息类型。</div>
    </h2>
    <div class="inline fields">
      <div class="three wide field">
        <label>有人关注了我</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_followed" checked="checked">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_followed">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>订阅了我的主题</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_subscribed" checked="checked">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_subscribed">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>赞了我的文章</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_upvoted" checked="checked">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_upvoted">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>评论我</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_comment" checked="checked">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_comment">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="inline fields">
      <div class="three wide field">
        <label>提及我</label>
      </div>
      <div class="thirteen wide field">
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_mention" checked="checked">
            <label>开启</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="notification_mention">
            <label>关闭</label>
          </div>
        </div>
      </div>
    </div>
    <div class="ui divider"></div>
    <button class="ui primary button" type="submit">保存</button>
  </form>
</template>

<script>
// import NProgress from 'nprogress';

export default {
  data() {
    return {
      rules: {
      },
      params: {
        notification_followed: 'true',
        notification_subscribed: 'true',
        notification_upvoted: 'true',
        notification_comment: 'true',
        notification_mention: 'true',
      },
    };
  },
  methods: {
    submit() {
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
