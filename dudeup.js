const entries = map => Object.keys(map).map(key => [key, map[key]])
const sum = values => values.reduce((total, x) => rounded(total + x), 0)
const rounded = amount => Math.round(amount * 1e2) / 1e2
const mapToMap = (values, mapping) => values.reduce((acc, value) => {
  acc[value] = mapping(value)
  return acc
}, {})

function DudeUp (groupMemberPayments) {
  const groupMembers = Object.keys(groupMemberPayments)
  const mapEachGroupMember = mapping => mapToMap(groupMembers, mapping)
  const totalPaidPerGroupMember = mapEachGroupMember(name => sum(groupMemberPayments[name]))
  const groupTotal = sum(entries(totalPaidPerGroupMember).map(([name, total]) => total))
  const averageAmountPerGroupMember = rounded(groupTotal / Math.max(1, groupMembers.length))
  const { amountOwedByGroupMember, writtenOffAmounts } = owedByEachMember(mapEachGroupMember, totalPaidPerGroupMember, averageAmountPerGroupMember)

  return { averageAmountPerGroupMember, groupTotal, amountOwedByGroupMember, totalPaidPerGroupMember, writtenOffAmounts }
}

function owedByEachMember (mapEachGroupMember, totalPaidPerGroupMember, averageAmountPerGroupMember) {
  const balances = mapEachGroupMember(name => rounded(totalPaidPerGroupMember[name] - averageAmountPerGroupMember))
  const stillOwed = () => entries(balances).filter(([name, balance]) => balance > 0)
  const stillOwing = () => entries(balances).filter(([name, balance]) => balance < 0)
  const result = mapEachGroupMember(name => ({}))
  const writtenOffAmounts = mapEachGroupMember(name => [])
  while (stillOwed().length) {
    const [owedToName, owedToBalance] = stillOwed()[0]
    if (stillOwing().length) {
      const [owedByName, owedByBalance] = stillOwing()[0]
      const amount = Math.min(owedToBalance, Math.abs(owedByBalance))
      result[owedByName][owedToName] = amount
      balances[owedToName] = rounded(owedToBalance - amount)
      balances[owedByName] = rounded(owedByBalance + amount)
    } else {
      writtenOffAmounts[owedToName] = [ ...writtenOffAmounts[owedToName], owedToBalance ]
      balances[owedToName] = rounded(0)
    }
  }
  return { amountOwedByGroupMember: result, writtenOffAmounts }
}

module.exports = DudeUp
