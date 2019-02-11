# element-snapshot

A tool for helping create an Interface Inventory across sites by screen-shotting elements from a list of URLs.

## Usage

```
npm install
```

Populate `site-list.csv` with a comma-seperated list of URL, CSS Selector & Label (optional)

e.g. If you wanted to screenshot the `h1`'s used on airbnb.com and slack.com and save the images as 'header.png' you can use this:

```
# contents of site-list.csv
https://airbnb.com/,h1,Header
https://slack.com/,h1,Header
```

If you omit the label (last column) the filename is based off the selector.

Inspired by [Hotshot](https://github.com/innoq/hotshot)
