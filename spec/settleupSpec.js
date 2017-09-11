const SettleUp = require('../settleup')

const noPayments = () => ({ paid: {} })
const compareAsJson = (a, b) => {
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))
}

describe('Settle Up', () => {
  it('calculates the total paid per group member', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()

    compareAsJson(
      SettleUp({ eAndG, sAndW }).totalPaidPerGroupMember,
      { eAndG: 0, sAndW: 0 }
    )

    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    sAndW.paid['c'] = 0.5

    compareAsJson(
      SettleUp({ eAndG, sAndW }).totalPaidPerGroupMember,
      { eAndG: 3, sAndW: 0.5 }
    )
  })

  it('calculates the total paid by the group', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    expect(SettleUp({ eAndG, sAndW }).groupTotal).toEqual(0)

    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    sAndW.paid['c'] = 0.5
    expect(SettleUp({ eAndG, sAndW }).groupTotal).toEqual(3.5)
  })

  it('calculates the average amount per group member', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    expect(SettleUp({ eAndG, sAndW }).averageAmountPerGroupMember).toEqual(0)

    eAndG.paid['a'] = 1
    eAndG.paid['b'] = 2
    sAndW.paid['c'] = 0.5
    expect(SettleUp({ eAndG, sAndW }).averageAmountPerGroupMember).toEqual(1.75)
  })

  it('calculates the amount owed to every member of the group', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    compareAsJson(
      SettleUp({ eAndG, sAndW }).amountOwedToGroupMember,
      { eAndG: 0, sAndW: 0 }
    )

    eAndG.paid['a'] = 2
    compareAsJson(
      SettleUp({ eAndG, sAndW }).amountOwedToGroupMember,
      { eAndG: 1, sAndW: 0 }
    )

    sAndW.paid['b'] = 2
    compareAsJson(
      SettleUp({ eAndG, sAndW }).amountOwedToGroupMember,
      { eAndG: 0, sAndW: 0 }
    )
  })

  it('calculates the amount group members should pay to ohers (in a group of 2) to settle up', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    compareAsJson(
      SettleUp({ eAndG, sAndW }).amountOwedByGroupMember,
      { eAndG: {}, sAndW: {} }
    )

    eAndG.paid['a'] = 2
    compareAsJson(
      SettleUp({ eAndG, sAndW }).amountOwedByGroupMember,
      { eAndG: {}, sAndW: { eAndG: 1 } }
    )

    sAndW.paid['b'] = 3
    compareAsJson(
      SettleUp({ eAndG, sAndW }).amountOwedByGroupMember,
      { eAndG: { sAndW: 0.5 }, sAndW: {} }
    )
  })

  it('calculates the amount group members should pay to ohers (in a group of 3+) to settle up', () => {
    const a = noPayments()
    const b = noPayments()
    const c = noPayments()

    a.paid['aLovelyThing'] = 3
    compareAsJson(
      SettleUp({ a, b, c }).amountOwedByGroupMember,
      { a: {}, b: { a: 1 }, c: { a: 1 } }
    )
  })
})
