const moment = global.moment;

module.exports = (value) => {
  moment.locale('zh-cn');
  return moment(value, 'YYYY-MM-DDThh:mm:ss').fromNow();
};
