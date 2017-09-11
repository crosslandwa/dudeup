function SettleUp (people) {
  return Object.keys(people).reduce((acc, name) => {
    const person = people[name]
    acc[name] = { totalPaid: totalPaid(person) }
    return acc
  }, {})
}

const totalPaid = person => Object.keys(person.paid).map(item => person.paid[item]).reduce((total, amount)  => total + amount, 0)

module.exports = SettleUp
