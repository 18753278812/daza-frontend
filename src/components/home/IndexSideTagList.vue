<template>
  <hr>
  <div class="row side-tags">
    <div class="col-xs-7">
      <h5>热门标签</h5>
    </div>
    <div class="col-xs-5 text-xs-right">
      <a v-link="{ name: 'tag_list' }"><small class="text-muted">全部标签</small></a>
    </div>
    <div class="col-xs-12">
      <ul>
        <li v-for="tag in tags">
          <a v-link="{ name: 'tag_detail', params: { name: tag.name } }">
            <span class="tag tag-default">{{ tag.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getTagList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
      tags: state => state.tags.all,
    },
    actions: {
      getTagList,
    },
  },
  data() {
    return {
    };
  },
  ready() {
    this.getTagList(1);
  },
};
</script>

<style lang="scss" scoped>
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
