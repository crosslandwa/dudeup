const initial = () => ({
  groupTotal: 0,
  totalPerPerson: {}
})

const sum = values => values.reduce((total, x) => total + x, 0)

function SettleUp (people) {
  const result = Object.keys(people).reduce((acc, name) => {
    const person = people[name]
    acc.totalPerPerson[name] = totalPaid(person)
    return acc
  }, initial())

  result.groupTotal = sum(Object.keys(result.totalPerPerson).map(name => result.totalPerPerson[name]))
  return result
}

const totalPaid = person => sum(Object.keys(person.paid).map(item => person.paid[item]))

module.exports = SettleUp
