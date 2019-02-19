const Path = require('path');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const slugify = require('slugify');
const { saveFile } = require('./lib/saveFile');
const { createCapture } = require('./lib/createCapture');
const configScmema = require('./lib/configSchema');
const sitesConfig = require('./site-list');

const CAPTURE_PATH = './captures';
const TIMEOUT = process.env.TIMEOUT || 10000;
let browser;

configScmema.validate(sitesConfig, async err => {
  if (err) {
    // console.error(err);
    console.log('Validation error in config.js');
    let errors = err.details.map(i => {
      return { path: i.path.join(' > '), message: i.message };
    });
    console.log(errors);
    return;
  }
  try {
    // Open browser
    browser = await puppeteer.launch({
      // headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    // process each site URL
    await sitesConfig.sites.reduce(async (promise, siteUrl) => {
      await promise;

      const page = await browser.newPage();

      page.setDefaultNavigationTimeout(TIMEOUT);
      page.setViewport({ width: 1025, height: 1000, deviceScaleFactor: 2 });

      await Object.keys(sitesConfig.components).reduce(
        async (promise, componentKey) => {
          await promise;
          const component = sitesConfig.components[componentKey];

          await page.goto(`${siteUrl}${component.path}`, {
            waitUntil: 'networkidle2'
          });

          if (component.beforeCapture) {
            try {
              await component.beforeCapture(page, component);
            } catch (error) {
              console.log('Unable to execute beforeCapture script.');
              console.error(error);
            }
          }

          // get capture
          let screenshot = await createCapture(page, component.selector);

          // create pathing for capture
          let domain = new URL(siteUrl).hostname;
          let fullPath = Path.resolve(
            CAPTURE_PATH,
            `${slugify(componentKey).toLowerCase()}`,
            `${slugify(componentKey).toLowerCase()}--${slugify(domain)}.png`
          );

          // ensure dir exists
          await fs.ensureDir(Path.parse(fullPath).dir);

          // save file
          let sf = saveFile(fullPath, screenshot);
          return sf;
        },
        true
      );

      return page.close();
    }, true);

    // All done.
    browser.close();
  } catch (e) {
    console.error(e);
  }
});
