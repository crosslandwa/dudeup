const SettleUp = require('../settleup')

const noPayments = () => ({ paid: {} })
const compareAsJson = (a, b) => {
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))
}

describe('Settle Up', () => {
  it('returns the total paid per person', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()

    compareAsJson(
      SettleUp({ eAndG, sAndW }).totalPerPerson,
      { eAndG: 0, sAndW: 0 }
    )

    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    sAndW.paid['c'] = 0.5

    compareAsJson(
      SettleUp({ eAndG, sAndW }).totalPerPerson,
      { eAndG: 3, sAndW: 0.5 }
    )
  })

  it('returns the total paid by the group', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    expect(SettleUp({ eAndG, sAndW }).groupTotal).toEqual(0)

    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    sAndW.paid['c'] = 0.5
    expect(SettleUp({ eAndG, sAndW }).groupTotal).toEqual(3.5)
  })
})
