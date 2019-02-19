const config = {
  sites: [
    'https://jobs.theguardian.com',
    'https://jobs.telegraph.co.uk',
    'https://independentjobs.independent.co.uk'
  ],
  components: {
    Navigation: {
      path: '/',
      selector: '.primary-nav'
    },
    'Add to shortlist': {
      path: '/jobs/',
      beforeCapture: (page, component) => {
        return Promise.all([
          page.click('#listing li:first-child .button--lister-view-details'),
          page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);
      },
      selector: '.js-shortlist-trigger'
    },
    'View details button': {
      path: '/jobs/',
      selector: '.button--lister-view-details'
    },
    Footer: {
      path: '/jobs/',
      selector: 'footer.contentinfo'
    }
  }
};

module.exports = config;
