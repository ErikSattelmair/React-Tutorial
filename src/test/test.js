const puppeteer = require('puppeteer');
const path = require('path');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

let server
let browser
let page

describe('Login', () => {
  beforeAll(async () => {
        await app.use(express.static(path.join(__dirname, '../../build')));

        await app.get('/', function(req, res) {
          res.sendFile(path.join(__dirname, '../../build/index.html'))
        });

        await app.listen(port);

        server = app;

        browser = await puppeteer.launch({
        	  headless: false
        });

        page = await browser.newPage();
   })

  test('users can login', async () => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('.game-info');
    const html = await page.$eval('.game-info > div', e => e.innerHTML);
    expect(html).toBe('Next Player: X');
  })

  // This function occurs after the result of each tests, it closes the browser and server
    afterAll(async () => {
      await browser.close()
      await server.close(done)
    })

});