function SettleUp (people) {
  return Object.keys(people).reduce((acc, name) => {
    const person = people[name]
    acc[name] = { totalPaid: Object.keys(person.paid).map(item => person.paid[item]).reduce((total, amount)  => total + amount, 0) }
    return acc
  }, {})
}

module.exports = SettleUp
