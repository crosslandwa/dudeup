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

Then run the following in the dev tools to convert the SVG to a 64 x 64 pixel `.ico` file (which the browser will download via a prompt)

```js
const imageData = new XMLSerializer().serializeToString(document.getElementById("logo"))
const img = document.createElement('img');
img.onload = () => {
  const canvas = document.createElement('canvas');
  const SIZE_IN_PIXELS = 64
  canvas.width = SIZE_IN_PIXELS;
  canvas.height = SIZE_IN_PIXELS;
  canvas.getContext('2d').drawImage(img, 0, 0, SIZE_IN_PIXELS, SIZE_IN_PIXELS);
  canvas.toBlob(
    (imgBlob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(new Blob(
        [
          new Uint8Array([0, 0, 1, 0]).buffer, // ico file header
          new Uint8Array([1, 0]).buffer, // Indiciate 1 image [01, 00]
          new Uint8Array([canvas.width]).buffer, // Image width
          new Uint8Array([canvas.height]).buffer, // Image height
          new Uint8Array([0]).buffer, // Specify no color palette [00]
          new Uint8Array([0]).buffer, // Reserved space [00]
          new Uint8Array([1, 0]).buffer, // Specify 1 color plane
          new Uint8Array([32, 0]).buffer, // Specify 32 bits per pixel (bit depth)
          new Uint32Array([imgBlob.size]).buffer, // Specify image size in bytes
          new Uint32Array([22]).buffer, // Specify image offset in bytes
          imgBlob
        ],
        { type: 'image/vnd.microsoft.icon' }
      ));
      downloadLink.download = "favicon.ico";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    'image/png'
  );
};
console.log(`<link rel="shortcut icon" type="image/x-icon" href="data:image/svg+xml;base64,${btoa(imageData)}">`)
img.src = URL.createObjectURL(new Blob([imageData], {type:"image/svg+xml;charset=utf-8"}));
```

Finally
- copy the `<link>` that is output to the console into the `<head>` of the HTML template (this includes an embedded svg favicon)
- copy the downloaded file to `/src/favicon.ico` - this file will be copied into the `/dist` directory during the build