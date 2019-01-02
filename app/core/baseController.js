'use strict';

const Controller = require('egg').Controller;

const codeMap = {
  '-1': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
};

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null
    };
  }

  fail(code, message) {
    this.ctx.body = {
      code: code || -1,
      message: message || codeMap[code || '-1'] || codeMap['-1']
    }
  }

  notFound(message = 'not found') {
    this.ctx.throw(404, message);
  }
}

module.exports = BaseController;
