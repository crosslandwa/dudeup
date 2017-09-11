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

  const owingMembers = Object.keys(groupMembers).filter(name => result.totalPaidPerGroupMember[name] <= sharePerMember)
  result.amountOwedByGroupMember = owingMembers.reduce((acc, name) => {
    // pick first other member with money owed
    const owedToName = Object.keys(groupMembers)
      .filter(other => other !== name)
      .filter(other => result.totalPaidPerGroupMember[other] > sharePerMember)
      [0]
    acc[name] = { [owedToName]: result.amountOwedToGroupMember[owedToName] }
    return acc
  }, result.amountOwedByGroupMember)

  return result
}

const totalPaid = member => sum(values(member, 'paid'))

module.exports = SettleUp
