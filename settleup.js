const initial = () => ({
  averageAmountPerGroupMember: 0,
  groupTotal: 0,
  amountOwedByGroupMember: {},
  amountOwedToGroupMember: {},
  totalPaidPerGroupMember: {}
})

const values = (map, key) => Object.keys(map[key]).map(x => map[key][x])
const entries = map => Object.keys(map).map(key => [key, map[key]])
const sum = values => values.reduce((total, x) => total + x, 0)

function SettleUp (groupMembers) {
  const result = Object.keys(groupMembers).reduce((acc, name) => {
    acc.totalPaidPerGroupMember[name] = totalPaid(groupMembers[name])
    acc.amountOwedByGroupMember[name] = {}
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

  const balances = Object.keys(groupMembers).reduce((acc, name) => {
    acc[name] = result.totalPaidPerGroupMember[name] - sharePerMember
    return acc
  }, {})

  while (entries(balances).filter(([name, balance]) => balance > 0).length) {
    const [owedToName, owedToBalance] = entries(balances).filter(([name, balance]) => balance > 0)[0]
    const [owedByName, owedByBalance] = entries(balances).filter(([name, balance]) => balance < 0)[0]
    const amount = Math.min(balances[owedToName], Math.abs(balances[owedByName]))
    result.amountOwedByGroupMember[owedByName][owedToName] = amount
    balances[owedToName] -= amount
    balances[owedByName] += amount
  }

  return result
}

const totalPaid = member => sum(values(member, 'paid'))

module.exports = SettleUp
