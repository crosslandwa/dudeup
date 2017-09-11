const initial = () => ({
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

  result.amountOwedToGroupMember = Object.keys(groupMembers).reduce((acc, name) => {
    acc[name] = Math.max(0, result.totalPaidPerGroupMember[name] - sharePerMember)
    return acc
  }, {})

  return result
}

const totalPaid = member => sum(values(member, 'paid'))

module.exports = SettleUp
