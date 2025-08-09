import { calculate } from '../calculations'

const compareAsJson = (a, b) => {
  expect(JSON.stringify(a)).toEqual(JSON.stringify(b))
}

describe('Settle Up', () => {
  it('calculates the total paid per group member', () => {
    compareAsJson(
      calculate({ eAndG: [], sAndW: [] }).totalPaidPerGroupMember,
      { eAndG: 0, sAndW: 0 }
    )

    compareAsJson(
      calculate({ a: [{ amount: 1 }, { amount: 2, dudes: ['a'] }], b: [{ amount: 0.5 }] }).totalPaidPerGroupMember,
      { a: 3, b: 0.5 }
    )
  })

  it('calculates the total paid by the group', () => {
    expect(calculate({ eAndG: [], sAndW: [] }).groupTotal).toEqual(0)
    expect(calculate({ eAndG: [{ amount: 1 }, { amount: 2 }], sAndW: [{ amount: 0.5 }] }).groupTotal).toEqual(3.5)
  })

  it('calculates the total the group has spent on each person, taking into account where not everyone is involved in every bought item', () => {
    compareAsJson(
      calculate({
        a: [{ amount: 9 }],
        b: [{ amount: 6 }],
        c: []
      }).totalSpentOnGroupMember,
      { a: 5, b: 5, c: 5 }
    )

    compareAsJson(
      calculate({
        a: [{ amount: 9 }],
        b: [{ amount: 6, dudes: ['b', 'c'] }],
        c: []
      }).totalSpentOnGroupMember,
      { a: 3, b: 6, c: 6 }
    )
  })

  it('calculates the amount group members should pay to others taking into account where not everyone is involved in every bought item', () => {
    compareAsJson(
      calculate({ a: [{ amount: 9 }], b: [{ amount: 6 }], c: [] }).amountOwedByGroupMember,
      { a: {}, b: {}, c: { a: 4, b: 1 } }
    )

    compareAsJson(
      calculate({ a: [{ amount: 9 }], b: [{ amount: 6, dudes: ['b'] }], c: [] }).amountOwedByGroupMember,
      { a: {}, b: { a: 3 }, c: { a: 3 } }
    )

    compareAsJson(
      calculate({
        a: [{ amount: 9 }],
        b: [{ amount: 6, dudes: ['b', 'c'] }],
        c: []
      }).amountOwedByGroupMember,
      { a: {}, b: {}, c: { a: 6 } }
    )

    compareAsJson(
      calculate({
        a: [{ amount: 9 }], // paid 9, owes 7
        b: [{ amount: 6, dudes: ['b', 'c'] }, { amount: 6, dudes: ['a', 'b'] }], // paid 12, owes 10
        c: [{ amount: 3 }] // paid 3, owes 7
      }).amountOwedByGroupMember,
      { a: {}, b: {}, c: { a: 2, b: 2 } }
    )
  })

  it('supports uneven splits if the client models them as separate items', () => {
    compareAsJson(
      calculate({
        a: [{ amount: 9 }], // paid 9, owes 3
        // b bought a 6 item, split unevenly between b and c
        b: [{ amount: 2, dudes: ['b'] }, { amount: 4, dudes: ['c'] }], // paid 6, owes 5
        c: [] // paid 0, owes 7
      }).amountOwedByGroupMember,
      { a: {}, b: {}, c: { a: 6, b: 1 } }
    )
  })

  it('will write off the odd amount when rounding occurs', () => {
    compareAsJson(
      calculate({ a: [{ amount: 0.04 }], b: [{ amount: 0.04 }], c: [] }).writtenOffAmounts,
      { a: [], b: [0.02], c: [] }
    )
  })
})
