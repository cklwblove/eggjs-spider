'use strict';

const Service = require('egg').Service;
const isNumber = require('is-number');
const LIMIT = 30;
const filterPoint = {
  _id: 0
};

const setPageNum = (skip) => {
  skip = skip - 1;
  return skip && isNumber(+skip) ? +skip * LIMIT : 0;
}

class BookService extends Service {

  async getAllBook(id, page = 1) {
    const {ctx} = this;
    const skip = setPageNum(page);
    const query = {};

    if (id) {
      query.bookId = id;
    }

    ctx.logger.info('info')

    const books = await ctx.model.Book.find(query, filterPoint).skip(skip || 0);

    return books;
  }

  async getBookInChapter(query) {
    const {ctx} = this;
    const {page, sort, id} = query;
    const skip = setPageNum(page);

    const chapters = await ctx.model.Chapter.find({
      bookId: id
    }, {
      title: 1,
      chapterId: 1,
      _id: 0
    }).skip(skip || 0).sort({
      chapterId: +sort || -1
    });

    const info = await ctx.model.Book.findOne({
      bookId: id
    });

    return {
      info,
      list: chapters
    }
  }

  async getDetailChapter(data) {
    const {ctx} = this;
    const chapter = await ctx.model.Chapter.findOne({
      chapterId: data.chapterId,
      bookId: data.bookId
    }, {
      content: 1,
      title: 1,
      chapterId: 1
    });

    return chapter;
  }

  async getPrevChapter(data) {
    const {ctx} = this;
    const chapter = await ctx.model.Chapter.find({
      chapterId: {
        '$lt': data.chapterId
      },
      bookId: data.bookId
    }, {
      content: 1,
      title: 1,
      chapterId: 1
    }).limit(1).sort({
      chapterId: -1
    });

    return chapter;
  }

  async getNextChapter(data) {
    const {ctx} = this;
    const chapter = await ctx.model.Chapter.find({
      chapterId: {
        '$gt': data.chapterId
      },
      bookId: data.bookId
    }, {
      content: 1,
      title: 1,
      chapterId: 1
    }).limit(1)

    return chapter;
  }

  async getOneBook(id) {
    const {ctx} = this;
    const book = await ctx.model.Book.findOne({
      bookId: id
    });

    // 如果有这本书
    if (!book) {
      // taskBook(id)
      // taskChapter(id, 0)

      console.log('开始跑任务啦', id)
      return {
        isExit: false,
      }
    } else {
      return {
        isExit: true,
        bookId: id
      }
    }
  }

  async saveBook(data) {
    const {ctx} = this;
    const book = new ctx.model.Book(data);

    return book.save();
  }

}

module.exports = BookService;
