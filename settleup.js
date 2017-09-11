function SettleUp (people) {
  return Object.keys(people).reduce((acc, name) => {
    acc[name] = { totalPaid: 0 }
    return acc
  }, {})
}

module.exports = SettleUp
