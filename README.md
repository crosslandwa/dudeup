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
