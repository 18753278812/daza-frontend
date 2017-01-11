<template>
  <img v-lazy="thumbnailUrl">
</template>

<script>
export default {
  name: 'loadmore',
  props: {
    src: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  computed: {
    thumbnailUrl() {
      const value = this.src;
      let width = 120;
      let height = 120;
      // 如是为空，则返回默认占位图
      if (value === undefined || value === '' || !value.startsWith('http')) {
        return '/static/images/placeholder_image.png';
      // 加入参数七牛的图片处理参数
      } else if (value.indexOf(process.env.DOMAIN_NAME) > -1 ||
        value.indexOf('clouddn.com') > -1 || value.indexOf('qnssl.com') > -1) {
        if (this.width !== undefined) {
          width = this.width;
        }
        if (this.height !== undefined) {
          height = this.height;
        }
        return `${value}?imageView2/2/w/${width}/h/${height}`;
      }
      return value;
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onError() {
      // this.src = null;
    },
  },
};
</script>

<style scoped>
</style>
