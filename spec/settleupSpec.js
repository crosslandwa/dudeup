const SettleUp = require('../settleup')

const noPayments = () => ({ paid: {} })

describe('Settle Up', () => {
  it('returns a total paid of zero when no purchases have been made', () => {
    expect(SettleUp({ eAndG: noPayments(), sAndW: noPayments() })).toEqual({
      eAndG: {
        totalPaid: 0
      },
      sAndW: {
        totalPaid: 0
      }
    })
  })

  it('returns a total paid per person when purchases have been made', () => {
    const eAndG = noPayments()
    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    const sAndW = noPayments()
    sAndW.paid['c'] = 0.5
    expect(SettleUp({ eAndG, sAndW })).toEqual({
      eAndG: {
        totalPaid: 3
      },
      sAndW: {
        totalPaid: 0.5
      }
    })
  })
})
