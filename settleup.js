const initial = () => ({
  averageAmountPerGroupMember: 0,
  groupTotal: 0,
  amountOwedByGroupMember: {},
  totalPaidPerGroupMember: {}
})

const entries = map => Object.keys(map).map(key => [key, map[key]])
const sum = values => values.reduce((total, x) => rounded(total + x), 0)
const totalPaid = memberPayments => sum(entries(memberPayments).map(([item, amount]) => amount))
const rounded = amount => Math.round(amount * 1e2) / 1e2;

function SettleUp (groupMemberPayments) {
  const result = Object.keys(groupMemberPayments).reduce((acc, name) => {
    acc.totalPaidPerGroupMember[name] = totalPaid(groupMemberPayments[name])
    acc.amountOwedByGroupMember[name] = {}
    return acc
  }, initial())

  result.groupTotal = sum(entries(result.totalPaidPerGroupMember).map(([name, total]) => total))

  const numberOfGroupMembers = Object.keys(groupMemberPayments).length
  result.averageAmountPerGroupMember = rounded(result.groupTotal / Math.max(1, numberOfGroupMembers))

  const balances = Object.keys(groupMemberPayments).reduce((acc, name) => {
    acc[name] = rounded(result.totalPaidPerGroupMember[name] - result.averageAmountPerGroupMember)
    return acc
  }, {})

  while (entries(balances).filter(([name, balance]) => balance > 0).length) {
    const [owedToName, owedToBalance] = entries(balances).filter(([name, balance]) => balance > 0)[0]
    const stillOwing = entries(balances).filter(([name, balance]) => balance < 0)
    if (stillOwing.length) {
      const [owedByName, owedByBalance] = stillOwing[0]
      const amount = Math.min(balances[owedToName], Math.abs(balances[owedByName]))
      result.amountOwedByGroupMember[owedByName][owedToName] = amount
      balances[owedToName] = rounded(balances[owedToName] - amount)
      balances[owedByName] = rounded(balances[owedByName] + amount)
    } else {
      console.log(`writing off ${balances[owedToName]} owed to ${owedToName}`)
      balances[owedToName] = rounded(0)
    }
  }

  return result
}

module.exports = SettleUp
