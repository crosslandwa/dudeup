# Dude Up

I went on holiday with friends

We all bought things for the group (shopping, meals, Daddy beers, etc)

At the end we wanted to know who owed what to who to settle up the costs

This code does that calculation

## Usage

```js
const DudeUp = require('./dudeup')

const result = DudeUp({
  personA: [15, 235.61],
  personB: [18.45, 18.48, 11.73, 154.60, 12.75, 120.34, 12.14, 16.47, 10.50, -40],
  personC: [15, 61, 10],
  personD: [257.83]
})
```
