'use strict';

const Subscription = require('egg').Subscription;
const {taskBook} = require('../tasks/book');
const {taskChapter} = require('../tasks/chapter');

class BookTask extends Subscription {
  async subscribe() {
    const {ctx} = this;
    const books = await ctx.model.Book.find({});
    // ctx.logger.info('schedule bookTask begin', books);

    books.forEach(async (book) => {
      ctx.logger.info('handleTaskChapter book.bookId', book.bookId);
      // 激活爬数据 为下一次服务
      await taskBook(book.bookId);

      let count = await ctx.model.Chapter.find({
        bookId: book.bookId
      }).countDocuments();
      // 对比数据库里面的数据 与 新的总数对比
      if (book.chapterNum > count) {
        // 往后更新5章  防止有作者占坑的预告
        await taskChapter(book.bookId, count > 5 ? count - 5 : count)
      }
      ctx.logger.info('------------>', book.chapterNum, count);
    });

    ctx.logger.info('schedule bookTask end');
  }

  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '3s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      // disable: 'true',
      //immediate:'true',
    };
  }

}

module.exports = BookTask;
