const puppeteer = require('puppeteer');

let url = `http://www.mytxt.cc/read/`;

const sleep = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

process.on('message', async (book) => {
  url = `${url}${book.bookId}/`;

  console.log('Start visit the target page --- chapter', url)

  const browser = await puppeteer.launch({
    // executablePath: '/usr/bin/google-chrome-stable',
    args: ['--no-sandbox'],
    dumpio: false,
    headless: true
  }).catch(err => {
    console.log('browser--error:', err)
    browser.close()
  })
  // console.log('chapter:', browser);
  const page = await browser.newPage();
  // console.log('page', page);
  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 3000000
    })
    console.log('response', response);
  } catch (e) {
    console.log('sleep:', e)
  }


  // await sleep(3000)

  console.log('sleep:')

  try {
    await page.waitForSelector('.story_list_m62topxs')
  } catch (e) {
    console.log('sleep:', e)
  }

  console.log('sleep waitForSelector')

  let result = await page.evaluate((book) => {
    let list = document.querySelectorAll('.cp_dd_m62topxs li')
    let reg = new RegExp(`${book.bookId}\/(\\S*).html`)
    let chapter = Array.from(list).map((item, index) => {
      return {
        title: item.innerText,
        chapterId: item.innerHTML.match(reg)[1]
      }
    })
    return chapter
  }, book)

  console.log('chapter result', result);

  // 截取从哪里爬数据
  let tempResult = result.slice(book.startNum, result.length)

  for (let i = 0; i < tempResult.length; i++) {
    let chapterId = tempResult[i].chapterId
    console.log('开始爬url:', `${url}${chapterId}.html`)

    await page.goto(`${url}${chapterId}.html`, {
      waitUntil: 'networkidle2',
      timeout: 3000000
    })

    await sleep(2000)

    const content = await page.evaluate(() => {
      return document.querySelectorAll('.detail_con_m62topxs p')[0].innerText
    })

    tempResult[i].content = content
    tempResult[i].bookId = book.bookId
    // tempResult[i].sort = i // 截取之后会不准

    process.send(tempResult[i])
  }

  browser.close()
  process.exit(0)

});
