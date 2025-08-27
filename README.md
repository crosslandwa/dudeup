# Dude Up webapp

## What

A webapp to record and settle up up shared expenses (i.e. a kitty)

## Why

I went on a holiday with friends. We had a shared kitty and a run in with a scorpion. When I got home I thought it would be fun to write some code to calculate who owed what to whom.

[Writing that logic](https://github.com/crosslandwa/dudeup) was fairly easy, and I realised it would be fun/an opportunity to learn/practice another (React) webapp

### Build

```bash
npm run build
# or
npm run build -- --watch #automatically re-build whenever changes are made
```

### Run

Open `dist/index.html` in your browser

### Tests

```bash
npm test
```
Tests are run with [Jest](https://facebook.github.io/jest/)

### Linting

```bash
npm run lint
```

Linting is done with [ESLint](https://eslint.org/) and is configured to conform code to https://standardjs.com/

### Deployment

This site is hosted on [Github Pages](https://crosslandwa.github.io/dudeup). Deployment happens on commit to the `main` branch via a Github Action

### Logo

Generate a SVG logo - here's the markup for the current one

```html
  <svg id="logo" width="300" height="300">
    <rect width="300" height="300" fill="#51b1c7" rx="50" ry="50" />
    <text x="10" y="145" fill="#efefef" font-size="9em" font-family="Monospace" font-weight="800">dUde</text>
    <text x="80" y="250" fill="#efefef" font-size="9em" font-family="Monospace" font-weight="800">P</text>
  </svg>
```

Then grab the svg content as a base64 encoded string

```js
`data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(document.getElementById("logo")))}`
```

Finally, place the generated string in the `href` attribute of the `<link rel="shortcut icon">` element in the `<head>` of the page