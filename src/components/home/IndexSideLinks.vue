<template>
  <hr v-if="data.lists.length > 0">
  <div class="row side-links" v-if="data.lists.length > 0">
    <div class="col-xs-12">
      <h5>友情链接</h5>
    </div>
    <div class="col-xs-12">
      <ul>
        <li v-for="article in data.lists ">
          <div class="image">
            <img class="lazy img-rounded" :data-original="article.image_url | thumbnail">
          </div>
          <div class="content">
            <div class="row">
              <div class="col-md-8 col-sm-12">
                <a class="title" :href="article.link">{{ article.title }}</a>
              </div>
            </div>
            <p class="summary">{{ article.summary }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getTopicArticleList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getTopicArticleList,
    },
  },
  data() {
    return {
      data: {
        lists: [],
      },
    };
  },
  ready() {
    this.getTopicArticleList('side-links', 1, 4).then(data => {
      this.data.lists = data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.side-links {
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
        .title {
          font-size: 13px;
        }
        .summary {
          font-size: 10px;
          color: #bbb;
          margin-bottom: 2px;
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
</style>
