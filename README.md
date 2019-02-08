# element-snapshot

A tool for helping create an Interface Inventory but screen-shotting elements from a list of URLs.

## Usage

```
npm install
```

Populate `site-list.csv` with a comma-seperated list of URL, CSS Selector & Label

e.g. If you wanted to screenshot the `h1`'s used on airbnb.com and microsoft.com and save the images as 'header.png' you can use this:

```
# contents of site-list.csv
https://airbnb.com/,h1,Header
https://microsoft.com/,h1,Header
```
