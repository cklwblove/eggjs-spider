'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/book/load_all_book', 'book.loadAllBook');
  router.post('/book/load_book_in_chapter', 'book.loadBookInChapter');
  router.post('/book/load_detail_chapter', 'book.loadDetailChapter');
  router.post('/book/load_prev_chapter', 'book.loadPrevChapter');
  router.post('/book/load_next_chapter', 'book.loadNextChapter');
  router.post('/book/load_one_book', 'book.loadOneBook');
};
