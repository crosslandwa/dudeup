import React from 'react'
import { connect } from 'react-redux'
import { dudesInDebtSummarySelector } from './interactions'
import DudeSummary from './DudeSummary'

const mapStateToProps = state => {
  const { debts, dudeIds, spentAmounts, spentOnAmounts } = dudesInDebtSummarySelector(state)
  return {
    ids: dudeIds,
    balances: dudeIds.reduce((acc, id) => ({
      ...acc,
      [id]: spentOnAmounts[id] - spentAmounts[id]
    }), {}),
    paymentsDue: Object.keys(debts).reduce((acc, dudeId) => acc.concat(
      debts[dudeId].map(({ dudeId: to, amount }) => ({ from: dudeId, to, amount }))
    ), [])
  }
}

const Summary = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    {props.ids.map(id => (
      <DudeSummary id={id} paymentsDue={props.paymentsDue} balance={props.balances[id]} />
    ))}
  </div>
)

export default connect(mapStateToProps)(Summary)
