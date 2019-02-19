# element-snapshot

A tool for helping create an Interface Inventory across sites by screen-shotting elements from a list of URLs.

## Usage

```
npm install
```

Populate `config.js` with a list of website URLs to capture from, then provide a list of components to capture in the following format:

```
{
  sites: [
    'https://jobs.theguardian.com',
    'https://jobs.telegraph.co.uk',
    // add as many sites here as you want
  ],
  components: {
    Navigation: {
      path: '/',
      selector: '.primary-nav'
    },
    'View details button': {
      path: '/jobs/',
      selector: '.button--lister-view-details'
    },
    // add as many components here to capture from all sites
  }
}
```

e.g. If you wanted to screenshot the `h1`'s used on airbnb.com and slack.com you can use this:

```
# contents of config.js
{
  sites: [
    'https://airbnb.com',
    'https://slack.com',
  ],
  components: {
    h1: {
      path: '/',
      selector: 'h1'
    },
  }
}
```

Inspired by [Hotshot](https://github.com/innoq/hotshot)
