const SettleUp = require('../settleup')

describe('Settle Up', () => {
  it('returns a total paid of zero when no purchases have been made', () => {
    const noPayments = () => { paid: {} }
    expect(SettleUp({ eAndG: noPayments(), sAndW: noPayments() })).toEqual({
      eAndG: {
        totalPaid: 0
      },
      sAndW: {
        totalPaid: 0
      }
    })
  })
})
