const initial = () => ({
  groupTotal: 0,
  totalPerPerson: {}
})

function SettleUp (people) {
  const result = Object.keys(people).reduce((acc, name) => {
    const person = people[name]
    acc.totalPerPerson[name] = totalPaid(person)
    return acc
  }, initial())

  result.groupTotal = Object.keys(result.totalPerPerson)
    .map(name => result.totalPerPerson[name])
    .reduce((total, amount) => total + amount, 0)
  return result
}

const totalPaid = person => Object.keys(person.paid)
  .map(item => person.paid[item])
  .reduce((total, amount) => total + amount, 0)

module.exports = SettleUp
