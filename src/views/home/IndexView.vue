<template>
  <div class="ui main container">
    <div class="row">
      <div class="col-xs-8">
        <router-link to="/categories/latest">/categories/latest</router-link>
      </div>
      <div class="col-xs-4">
        <sidebar-ad :article="ad_article"></sidebar-ad>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAd from '../../components/SidebarAd';

export default {
  components: {
    'sidebar-ad': SidebarAd,
  },
  data() {
    return {
      ad_article: null,
    };
  },
  mounted() {
    const params = { per_page: 1, page: 1 };
    this.$http.get('topics/side-ad/articles', params).then((data) => {
      console.log(data.data.data[0]);
      this.ad_article = data.data.data[0];
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
