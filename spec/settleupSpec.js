const SettleUp = require('../settleup')

const noPayments = () => ({ paid: {} })
const compareAsJson = (a, b) => {
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))
}


describe('Settle Up', () => {
  it('returns a total paid of zero when no purchases have been made', () => {
    compareAsJson(
      SettleUp({ eAndG: noPayments(), sAndW: noPayments() }),
      { totalPerPerson: {
        eAndG: 0,
        sAndW: 0
      }}
    )
  })

  it('returns a total paid per person when purchases have been made', () => {
    const eAndG = noPayments()
    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    const sAndW = noPayments()
    sAndW.paid['c'] = 0.5
    compareAsJson(
      SettleUp({ eAndG, sAndW }),
      { totalPerPerson: {
        eAndG: 3,
        sAndW: 0.5
      }}
    )
  })
})
