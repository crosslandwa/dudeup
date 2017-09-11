const initial = () => ({
  groupTotal: 0,
  totalOwedPerPerson: {},
  totalPerPerson: {}
})

const values = (map, key) => Object.keys(map[key]).map(x => map[key][x])
const sum = values => values.reduce((total, x) => total + x, 0)

function SettleUp (people) {
  const result = Object.keys(people).reduce((acc, name) => {
    const person = people[name]
    acc.totalPerPerson[name] = totalPaid(person)
    return acc
  }, initial())

  result.groupTotal = sum(values(result, 'totalPerPerson'))

  const numberOfPeople = Object.keys(people).length
  const sharePerMember = result.groupTotal / Math.max(1, numberOfPeople)

  result.totalOwedPerPerson = Object.keys(people).reduce((acc, name) => {
    acc[name] = Math.max(0, result.totalPerPerson[name] - sharePerMember)
    return acc
  }, {})

  return result
}

const totalPaid = person => sum(values(person, 'paid'))

module.exports = SettleUp
