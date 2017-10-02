const DudeUp = require('../dudeup')

const noPayments = () => ({ })
const compareAsJson = (a, b) => {
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))
}

describe('Settle Up', () => {
  it('calculates the total paid per group member', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()

    compareAsJson(
      DudeUp({ eAndG, sAndW }).totalPaidPerGroupMember,
      { eAndG: 0, sAndW: 0 }
    )

    eAndG['a'] = 1
    eAndG['b'] = 2
    sAndW['c'] = 0.5

    compareAsJson(
      DudeUp({ eAndG, sAndW }).totalPaidPerGroupMember,
      { eAndG: 3, sAndW: 0.5 }
    )
  })

  it('calculates the total paid by the group', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    expect(DudeUp({ eAndG, sAndW }).groupTotal).toEqual(0)

    eAndG['a'] = 1
    eAndG['b'] = 2
    sAndW['c'] = 0.5
    expect(DudeUp({ eAndG, sAndW }).groupTotal).toEqual(3.5)
  })

  it('calculates the average amount owed per group member', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    expect(DudeUp({ eAndG, sAndW }).averageAmountPerGroupMember).toEqual(0)

    eAndG['a'] = 1
    eAndG['b'] = 2
    sAndW['c'] = 0.5
    expect(DudeUp({ eAndG, sAndW }).averageAmountPerGroupMember).toEqual(1.75)
  })

  it('calculates the amount group members should pay to others (in a group of 2) to settle up', () => {
    const eAndG = noPayments()
    const sAndW = noPayments()
    compareAsJson(
      DudeUp({ eAndG, sAndW }).amountOwedByGroupMember,
      { eAndG: {}, sAndW: {} }
    )

    eAndG['a'] = 2
    compareAsJson(
      DudeUp({ eAndG, sAndW }).amountOwedByGroupMember,
      { eAndG: {}, sAndW: { eAndG: 1 } }
    )

    sAndW['b'] = 3
    compareAsJson(
      DudeUp({ eAndG, sAndW }).amountOwedByGroupMember,
      { eAndG: { sAndW: 0.5 }, sAndW: {} }
    )
  })

  it('calculates the amount group members should pay to ohers (in a group of 3+) to settle up', () => {
    const a = noPayments()
    const b = noPayments()
    const c = noPayments()
    const d = noPayments()

    a['aLovelyThing'] = 4
    b['anotherLovelyThing'] = 2
    compareAsJson(
      DudeUp({ a, b, c, d }).amountOwedByGroupMember,
      { a: {}, b: {}, c: { a: 1.5 }, d: { a: 1, b: 0.5 } }
    )
  })
})
