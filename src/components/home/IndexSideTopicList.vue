<template>
  <hr>
  <div class="row side-topics">
    <div class="col-xs-7">
      <h5>最新主题</h5>
    </div>
    <div class="col-xs-5 text-xs-right">
      <a v-link="{ name: 'topic_list' }"><small class="text-muted">主题广场</small></a>
    </div>
    <div class="col-xs-12">
      <ul>
        <li v-for="topic in topics ">
          <div class="image">
            <img class="lazy img-rounded" :data-original="topic.image_url">
          </div>
          <div class="content">
            <div class="row">
              <div class="col-md-8 col-sm-12">
                <a class="name" v-link="{ name: 'topic_detail', params: { id: topic.id } }">{{ topic.name }}</a>
              </div>
              <div class="col-md-4 text-md-right col-sm-12 text-sm-left">
                <small class="text-muted">{{ topic.subscriber_count }} 人订阅</small>
              </div>
            </div>
            <p class="description">{{ topic.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { auth } from '../../vuex/getters';
import { getTopicList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
      topics: state => state.topics.all,
    },
    actions: {
      getTopicList,
    },
  },
  data() {
    return {
    };
  },
  ready() {
    // 加载最新主题
    this.getTopicList(1).then(() => {

    });
  },
};
</script>

<style lang="scss" scoped>
// 侧边样主题列表样式
.side-topics {
  ul {
    list-style-type: none;
    padding: 0;
    li {
      margin: 10px 0 10px 0;
      .image {
        display: table-cell;
        vertical-align: top;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .content {
        width: 10000px;
        display: table-cell;
        vertical-align: top;
        padding-left: 8px;
        .name {
          font-size: 13px;
        }
        .description {
          font-size: 10px;
          color: #bbb;
          margin-bottom: 2px;
          height: 32px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
// 侧边栏文章列表样式
.side-article-list {

}
.side-tags {
  ul {
    list-style-type: none;
    padding: 0;
    li {
      display: inline-table;
      padding: 2px;
    }
  }
}
</style>
