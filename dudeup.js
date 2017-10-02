const initial = () => ({
  amountOwedByGroupMember: {}
})

const entries = map => Object.keys(map).map(key => [key, map[key]])
const sum = values => values.reduce((total, x) => rounded(total + x), 0)
const rounded = amount => Math.round(amount * 1e2) / 1e2

function DudeUp (groupMemberPayments) {
  const totalPaidPerGroupMember = Object.keys(groupMemberPayments).reduce((acc, name) => {
    acc[name] = sum(groupMemberPayments[name])
    return acc
  }, {})

  const groupTotal = sum(entries(totalPaidPerGroupMember).map(([name, total]) => total))

  const result = Object.keys(groupMemberPayments).reduce((acc, name) => {
    acc.amountOwedByGroupMember[name] = {}
    return acc
  }, initial())

  const numberOfGroupMembers = Object.keys(groupMemberPayments).length
  const averageAmountPerGroupMember = rounded(groupTotal / Math.max(1, numberOfGroupMembers))

  const balances = Object.keys(groupMemberPayments).reduce((acc, name) => {
    acc[name] = rounded(totalPaidPerGroupMember[name] - averageAmountPerGroupMember)
    return acc
  }, {})

  const stillOwed = () => entries(balances).filter(([name, balance]) => balance > 0)
  const stillOwing = () => entries(balances).filter(([name, balance]) => balance < 0)

  while (stillOwed().length) {
    const [owedToName, owedToBalance] = stillOwed()[0]
    if (stillOwing().length) {
      const [owedByName, owedByBalance] = stillOwing()[0]
      const amount = Math.min(owedToBalance, Math.abs(owedByBalance))
      result.amountOwedByGroupMember[owedByName][owedToName] = amount
      balances[owedToName] = rounded(owedToBalance - amount)
      balances[owedByName] = rounded(owedByBalance + amount)
    } else {
      console.log(`Writing off ${owedToBalance} owed to ${owedToName}`)
      balances[owedToName] = rounded(0)
    }
  }

  return {
    averageAmountPerGroupMember,
    groupTotal,
    amountOwedByGroupMember: result.amountOwedByGroupMember,
    totalPaidPerGroupMember
  }
}

module.exports = DudeUp
