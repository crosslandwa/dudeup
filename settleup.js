const initial = () => ({
  averageAmountPerGroupMember: 0,
  groupTotal: 0,
  amountOwedToGroupMember: {},
  totalPaidPerGroupMember: {}
})

const values = (map, key) => Object.keys(map[key]).map(x => map[key][x])
const sum = values => values.reduce((total, x) => total + x, 0)

function SettleUp (groupMembers) {
  const result = Object.keys(groupMembers).reduce((acc, name) => {
    acc.totalPaidPerGroupMember[name] = totalPaid(groupMembers[name])
    return acc
  }, initial())

  result.groupTotal = sum(values(result, 'totalPaidPerGroupMember'))

  const numberOfGroupMembers = Object.keys(groupMembers).length
  const sharePerMember = result.groupTotal / Math.max(1, numberOfGroupMembers)

  result.averageAmountPerGroupMember = sharePerMember

  result.amountOwedToGroupMember = Object.keys(groupMembers).reduce((acc, name) => {
    acc[name] = Math.max(0, result.totalPaidPerGroupMember[name] - sharePerMember)
    return acc
  }, {})

  result.amountOwedByGroupMember = Object.keys(groupMembers).reduce((acc, name) => {
    acc[name] = {}
    return acc
  }, {})


  const owingMembers = Object.keys(groupMembers).filter(name => result.totalPaidPerGroupMember[name] < sharePerMember)
  const owedMembers = Object.keys(groupMembers).filter(name => !owingMembers.includes(name))

  const balances = Object.keys(groupMembers).reduce((acc, name) => {
    acc[name] = { balance: result.totalPaidPerGroupMember[name] - sharePerMember }
    return acc
  }, {})

  result.amountOwedByGroupMember = owingMembers.reduce((acc, name) => {
    const owedToName = Object.keys(balances)
      .filter(other => other !== name)
      .filter(other => balances[other].balance > 0)[0]
    const amount = Math.min(balances[owedToName].balance, Math.abs(balances[name].balance))
    acc[name] = { [owedToName]: amount }
    balances[owedToName].balance -= amount
    return acc
  }, result.amountOwedByGroupMember)

  return result
}

const totalPaid = member => sum(values(member, 'paid'))

module.exports = SettleUp
