const Path = require('path');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const slugify = require('slugify');
const { saveFile } = require('./lib/saveFile');
const { parseCsv } = require('./lib/parseCsv');

const SNAPSHOT_PATH = './snapshots';
const TIMEOUT = process.env.TIMEOUT || 10000;
let browser;

async function takeScreenshot(site, padding = 0) {
  try {
    let screenshot;

    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(TIMEOUT);
    page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 2 });

    await page.goto(site.URL, { waitUntil: 'networkidle2' });

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) {
        return null;
      }
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, site.Selector);

    if (rect) {
      screenshot = await page.screenshot({
        clip: {
          x: rect.left - padding,
          y: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        }
      });

      let domain = new URL(site.URL).hostname;
      let fullPath = Path.resolve(
        SNAPSHOT_PATH,
        domain,
        site.ElName.length
          ? `${slugify(site.ElName).toLowerCase()}.png`
          : `${slugify(site.Selector).toLowerCase()}.png`
      );
      fs.ensureDirSync(Path.parse(fullPath).dir);

      saveFile(fullPath, screenshot);
      console.log(`📸 ${site.URL} => ${site.Selector}`);
      await page.close();
    } else {
      console.error(`💥 Can't find selector ${site.Selector}`);
      await page.close();
    }
  } catch (e) {
    console.error(e);
  }
}

(async function() {
  try {
    // Parse CSV
    const siteArr = await parseCsv();

    // Open browser
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    // process promises in serial order
    await siteArr.reduce(async (promise, site) => {
      await promise;
      return takeScreenshot(site, 5);
    }, true);

    // All done.
    browser.close();
  } catch (e) {
    console.error(e);
  }
})();
