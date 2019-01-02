'use strict';

const Controller = require('../core/baseController');

class BookController extends Controller {

  async loadAllBook() {
    const {ctx, service} = this;
    let {id, page} = ctx.request.body;
    const createRule = {
      id: {type: 'string', required: true}
    };

    ctx.validate(createRule);

    try {
      const books = await service.book.getAllBook(id, page);
      this.success(books);
    } catch (err) {
      ctx.logger.error('err', err);
      this.fail('500', err);
    }
  }

  async loadBookInChapter() {
    const {ctx, service} = this;
    const data = ctx.request.body;

    try {
      const list = await service.book.getBookInChapter(data);
      this.success(list);
    } catch (err) {
      this.fail('500', err);
    }
  }

  async loadDetailChapter() {
    const {ctx, service} = this;
    const {
      chapterId,
      bookId
    } = ctx.request.body;

    try {
      const list = await service.book.getDetailChapter({
        chapterId,
        bookId
      });
      this.success(list);
    } catch (err) {
      this.fail('500', err);
    }
  }

  async loadPrevChapter() {
    const {ctx, service} = this;
    const {
      chapterId,
      bookId
    } = ctx.request.body;

    try {
      const data = await service.book.getPrevChapter({
        chapterId,
        bookId
      });
      this.success(data);
    } catch (err) {
      this.fail('500', err);
    }
  }

  async loadNextChapter() {
    const {ctx, service} = this;
    const {
      chapterId,
      bookId
    } = ctx.request.body;

    try {
      const data = await service.book.getNextChapter({
        chapterId,
        bookId
      });
      this.success(data);
    } catch (err) {
      this.fail('500', err);
    }
  }

  async loadOneBook() {
    const {
      id
    } = ctx.request.body;

    try {
      const data = await service.book.getOneBook(id);
      this.success(data);
    } catch (err) {
      this.fail('500', err);
    }
  }
}

module.exports = BookController;
