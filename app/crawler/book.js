const puppeteer = require('puppeteer');

let url = `http://www.mytxt.cc/read/`;

const sleep = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

process.on('message', async (book) => {
  url = `${url}${book.bookId}/`;

  console.log('Start visit the target page --- book', url);

  let browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  }).catch(err => {
    console.log('browser--error', url);
    browser.close;
  });

  // console.log('book:', browser);
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 3000000
  });
  // console.log('crawler -> book --> page', page);
  await sleep(3000);

  await page.waitForSelector('.story_info_m62topxs');

  let result = await page.evaluate(() => {
    return {
      headImg: document.querySelector('.story_cover_m62topxs img').getAttribute('src'),
      name: document.querySelector('.info_left_m62topxs h1').innerText,
      author: document.querySelector('.info_left_m62topxs h2 a').innerText,
      chapterNum: document.querySelectorAll('.cp_dd_m62topxs').length
    }
  });
  console.log('crawler --> book ---> result', result)
  result = {
    ...result,
    bookId: book.bookId
  }

  process.send(result)
  browser.close()
  process.exit(0)
})
