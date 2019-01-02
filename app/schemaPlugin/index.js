'use strict';

/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */

module.exports = (schema) => {
  const {ctx} = this;
  schema.methods.create_at_ago = function () {
    return ctx.helper.formatDate(this.createAt, true);
  };

  schema.methods.update_at_ago = function () {
    return ctx.helper.formatDate(this.updateAt, true);
  };
};
