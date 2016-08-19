<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#profile" role="tab">基本资料</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#account" role="tab">账号和安全</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#notification" role="tab">推送消息设置</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="profile" role="tabpanel">
            <p>
              <div class="form-group row">
                <label for="avatar-input" class="col-xs-3 col-sm-2">头像</label>
                <div class="col-xs-9 col-sm-10">
                  <img v-bind:src="user.avatar_url" class="img-thumbnail" style="width: 80px; height: 80px; float: left">
                  <div style="margin-top: 10px; margin-left: 10px; float: left">
                    <button type="submit" class="btn btn-sm btn-secondary">选择头像</button>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" name="use_gravatar"> 使用 <a href="https://cn.gravatar.com/">Gravatar</a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-group row">
                <label for="name-input" class="col-xs-3 col-sm-2 col-form-label">姓名</label>
                <div class="col-xs-9 col-sm-10">
                  <input class="form-control" type="name" value="{{ user.name }}" id="name-input" placeholder="添加你的姓名">
                </div>
              </div>
              <div class="form-group row">
                <label for="city-input" class="col-xs-3 col-sm-2 col-form-label">城市</label>
                <div class="col-xs-9 col-sm-10">
                  <input class="form-control" type="text" value="{{ user.city }}" id="city-input" placeholder="添加你的城市">
                </div>
              </div>
              <div class="form-group row">
                <label for="website-input" class="col-xs-3 col-sm-2 col-form-label">网站</label>
                <div class="col-xs-9 col-sm-10">
                  <input class="form-control" type="url" value="{{ user.website }}" id="website-input" placeholder="添加你的网站">
                </div>
              </div>
              <div class="form-group row">
                <label for="bio-input" class="col-xs-3 col-sm-2 col-form-label">简介</label>
                <div class="col-xs-9 col-sm-10">
                  <textarea class="form-control" rows="3" id="bio-input" placeholder="在你的个人资料页中添加简介">{{ user.bio }}</textarea>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </p>
          </div>
          <div class="tab-pane" id="account" role="tabpanel">
            <p>
              <div class="form-group row">
                <label for="username-input" class="col-xs-3 col-sm-2 col-form-label">用户名</label>
                <div class="col-xs-9 col-sm-10">
                  <p class="form-control-static">{{ user.username }}</p>
                </div>
              </div>
              <div class="form-group row">
                <label for="email-input" class="col-xs-3 col-sm-2 col-form-label">邮箱</label>
                <div class="col-xs-9 col-sm-10">
                  <input class="form-control" type="name" value="{{ user.email }}" id="email-input" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="mobile-input" class="col-xs-3 col-sm-2 col-form-label">手机</label>
                <div class="col-xs-9 col-sm-10">
                  <input class="form-control" type="text" value="{{ user.mobile }}" id="mobile-input" placeholder="">
                </div>
              </div>
              <div class="form-group row">
                <label for="password-input" class="col-xs-3 col-sm-2 col-form-label">帐号密码</label>
                <div class="col-xs-9 col-sm-10">
                  <p class="form-control-static">
                    <a href="#">修改密码</a>
                  </p>
                </div>
              </div>
              <div class="form-group row">
                <label for="bio-input" class="col-xs-3 col-sm-2 col-form-label">社交帐号</label>
                <div class="col-xs-9 col-sm-10">
                  <p class="form-control-static">
                    <a href="#"> 绑定微信</a>
                    <a href="#"> 绑定微信</a>
                    <a href="#"> 绑定GitHub</a>
                  </p>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </p>
          </div>
          <div class="tab-pane" id="notification" role="tabpanel">
            <p>
              <h5>
                消息设置<br>
                <small class="text-muted">你可以在这里设置接收的消息类型。</small>
              </h5>
              <fieldset class="form-group row">
                <label class="col-xs-5 col-sm-2">订阅了我的主题</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </fieldset>
              <fieldset class="form-group row">
                <label class="col-xs-5 col-sm-2">订阅的主题有更新</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </fieldset>
              <fieldset class="form-group row">
                <label class="col-xs-5 col-sm-2">赞了我的文章</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </fieldset>
              <div class="form-group row">
                <label class="col-xs-5 col-sm-2">@ / 评论我</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-xs-5 col-sm-2">有人关注了我</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </div>
              <hr>
              <h5>
                邮件设置<br>
                <small class="text-muted">你可以在这里设置是否接收邮件。</small>
              </h5>
              <div class="form-group row">
                <label class="col-xs-5 col-sm-2">每周精选</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-xs-5 col-sm-2">产品和功能更新</label>
                <div class="col-xs-7 col-sm-10">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="on" checked>
                      开启
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="" value="off">
                      关闭
                    </label>
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
    },
  },
  data() {
    return {
      user: this.auth.user,
    };
  },
};
</script>

<style scoped>
</style>
