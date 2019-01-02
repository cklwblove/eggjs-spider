'use strict';

const dayjs = require('dayjs');

dayjs.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = dayjs(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }
};
