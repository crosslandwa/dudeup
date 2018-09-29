# Dude Up

I went on holiday with friends

We all bought things for the group (shopping, meals, Daddy beers, etc)

At the end we wanted to know who owed what to who to settle up the costs

This code does that calculation

## Usage

```js
const DudeUp = require('./dudeup')

const result = DudeUp({
  personA: [{ amount: 15 }, { amount: 235.61 }],
  personB: [
    { amount: 18.45 },
    { amount: 18.48 },
    { amount: 11.73 },
    { amount: 154.60 },
    { amount: 12.75 },
    { amount: 120.34 },
    { amount: 12.14 },
    { amount: 16.47 },
    { amount: 10.50 },
    { amount: -40 }
  ],
  personC: [{ amount: 15 }, { amount: 61 }, { amount: 10 }],
  personD: [{ amount: 257.83 }]
})
```

Which will output (JSONified)
```json
{
  "groupTotal": 929.9,
  "amountOwedByGroupMember": {
    "personA": {},
    "personB": {},
    "personC": {
      "personA": 18.12,
      "personB": 102.97,
      "personD": 25.34
    },
    "personD": {}
  },
  "totalPaidPerGroupMember": {
    "personA": 250.61,
    "personB": 335.46,
    "personC": 86,
    "personD": 257.83
  },
  "totalSpentOnGroupMember": {
    "personA": 232.49,
    "personB": 232.49,
    "personC": 232.49,
    "personD": 232.49
  },
  "writtenOffAmounts": {
    "personA": [],
    "personB": [],
    "personC": [],
    "personD": []
  }
}
```

### What if everything isn't split equally between everyone...

By default, every item is assumed to be shared by everyone in the group. If this is not the case supply a list of dudes that shared a particular item:

```js
const DudeUp = require('./dudeup')

const result = DudeUp({
  personA: [
    { amount: 100 }, // shared by everyone
    { amount: 50, dudes: ['personA', 'personB'] } // shared by just personA and personB
  ],
  personB: [],
  personC: [],
  personD: []
})
```

which results in (JSONified)
```json
{
  "groupTotal": 150,
  "amountOwedByGroupMember": {
    "personA": {},
    "personB": {
      "personA": 50
    },
    "personC": {
      "personA": 25
    },
    "personD": {
      "personA": 25
    }
  },
  "totalPaidPerGroupMember": {
    "personA": 150,
    "personB": 0,
    "personC": 0,
    "personD": 0
  },
  "totalSpentOnGroupMember": {
    "personA": 50,
    "personB": 50,
    "personC": 25,
    "personD": 25
  },
  "writtenOffAmounts": {
    "personA": [],
    "personB": [],
    "personC": [],
    "personD": []
  }
}
```
