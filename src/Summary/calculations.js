const sum = values => values.reduce((total, x) => rounded(total + x), 0)
const rounded = amount => Math.round(amount * 1e2) / 1e2

function calculate (groupMemberPayments) {
  const groupMembers = Object.keys(groupMemberPayments)
  const mapEachGroupMember = f => groupMembers.reduce((acc, x) => ({ ...acc, [x]: f(x) }), {})
  const totalPaidPerGroupMember = mapEachGroupMember(member => sum(groupMemberPayments[member].map(item => item.amount)))
  const groupTotal = sum(groupMembers.map(member => totalPaidPerGroupMember[member]))

  const allItems = groupMembers.reduce((acc, name) => acc.concat(
    groupMemberPayments[name].map(item => ({ amount: item.amount, dudes: item.dudes || groupMembers, paidForBy: name }))
  ), [])
  const totalMemberOwes = name => sum(allItems.filter(item => item.dudes.includes(name)).map(item => rounded(item.amount / item.dudes.length)))
  const totalMemberPaid = name => sum(allItems.filter(item => item.paidForBy === name).map(item => item.amount))
  const totalSpentOnGroupMember = groupMembers.reduce((acc, name) => ({
    ...acc,
    [name]: totalMemberOwes(name)
  }), {})
  const balances = mapEachGroupMember(name => totalMemberPaid(name) - totalSpentOnGroupMember[name])

  const { amountOwedByGroupMember, writtenOffAmounts } = owedByEachMember(groupMembers, mapEachGroupMember, balances)

  return { groupTotal, amountOwedByGroupMember, totalPaidPerGroupMember, totalSpentOnGroupMember, writtenOffAmounts }
}

function owedByEachMember (groupMembers, mapEachGroupMember, openingBalances) {
  const balances = { ...openingBalances }
  const stillOwed = () => groupMembers.filter(member => balances[member] > 0)
  const stillOwing = () => groupMembers.filter(member => balances[member] < 0)
  const amountOwedByGroupMember = mapEachGroupMember(() => ({}))
  const writtenOffAmounts = mapEachGroupMember(() => [])
  while (stillOwed().length) {
    const owedToName = stillOwed()[0]
    const owedToBalance = balances[owedToName]
    if (stillOwing().length) {
      const owedByName = stillOwing()[0]
      const owedByBalance = balances[owedByName]
      const amount = Math.min(owedToBalance, Math.abs(owedByBalance))
      amountOwedByGroupMember[owedByName][owedToName] = rounded(amount)
      balances[owedToName] = rounded(owedToBalance - amount)
      balances[owedByName] = rounded(owedByBalance + amount)
    } else {
      writtenOffAmounts[owedToName] = [ ...writtenOffAmounts[owedToName], owedToBalance ]
      balances[owedToName] = rounded(0)
    }
  }
  return { amountOwedByGroupMember, writtenOffAmounts }
}

export { calculate }
