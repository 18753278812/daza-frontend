// 七牛图片缩略图过滤器，用于将图片url加入七牛的图片处理参数
module.exports = (value) => {
  if (value !== undefined &&
      (value.indexOf(process.env.DOMAIN_NAME) > -1 || value.indexOf('clouddn.com') > -1)) {
    return `${value}?imageView2/2/w/500/h/500`;
  }
  return value;
};
