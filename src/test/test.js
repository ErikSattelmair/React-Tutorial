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
  beforeAll(async (done) => {
        await app.use(express.static(path.join(__dirname, '../../build')));

        await app.get('/', function(req, res) {
          res.sendFile(path.join(__dirname, '../../build/index.html'))
        });

        server = await app.listen(port);

        browser = await puppeteer.launch({
        	  headless: true
        });

        page = await browser.newPage();
        done();
   })

  test('users can login', async (done) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('.game-info');
    const html = await page.$eval('.game-info > div', e => e.innerHTML);
    expect(html).toBe('Next Player: X');
    done();
  })

  // This function occurs after the result of each tests, it closes the browser and server
    afterAll(async (done) => {
      browser.close()
      server.close(done)
    })
});