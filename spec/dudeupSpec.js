const DudeUp = require('../dudeup')

const compareAsJson = (a, b) => {
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))
}

describe('Settle Up', () => {
  it('calculates the total paid per group member', () => {
    compareAsJson(
      DudeUp({ eAndG: [], sAndW: [] }).totalPaidPerGroupMember,
      { eAndG: 0, sAndW: 0 }
    )

    compareAsJson(
      DudeUp({ eAndG: [1, 2], sAndW: [0.5] }).totalPaidPerGroupMember,
      { eAndG: 3, sAndW: 0.5 }
    )
  })

  it('calculates the total paid by the group', () => {
    expect(DudeUp({ eAndG: [], sAndW: [] }).groupTotal).toEqual(0)
    expect(DudeUp({ eAndG: [1, 2], sAndW: [0.5] }).groupTotal).toEqual(3.5)
  })

  it('calculates the average amount owed per group member', () => {
    expect(DudeUp({ eAndG: [], sAndW: [] }).averageAmountPerGroupMember).toEqual(0)
    expect(DudeUp({ eAndG: [1, 2], sAndW: [0.5] }).averageAmountPerGroupMember).toEqual(1.75)
  })

  it('calculates the amount group members should pay to others (in a group of 2) to settle up', () => {
    compareAsJson(
      DudeUp({ eAndG: [], sAndW: [] }).amountOwedByGroupMember,
      { eAndG: {}, sAndW: {} }
    )

    compareAsJson(
      DudeUp({ eAndG: [2], sAndW: [] }).amountOwedByGroupMember,
      { eAndG: {}, sAndW: { eAndG: 1 } }
    )

    compareAsJson(
      DudeUp({ eAndG: [2], sAndW: [3] }).amountOwedByGroupMember,
      { eAndG: { sAndW: 0.5 }, sAndW: {} }
    )
  })

  it('calculates the amount group members should pay to ohers (in a group of 3+) to settle up', () => {
    compareAsJson(
      DudeUp({ a: [4], b: [2], c: [], d: [] }).amountOwedByGroupMember,
      { a: {}, b: {}, c: { a: 1.5 }, d: { a: 1, b: 0.5 } }
    )
  })
})
