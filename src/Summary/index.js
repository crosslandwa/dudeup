import React from 'react'
import { connect } from 'react-redux'
import { dudesInDebtSummarySelector } from './interactions'
import DudeSummary from './DudeSummary'

const mapStateToProps = state => {
  const summary = dudesInDebtSummarySelector(state)
  return {
    ids: summary.dudeIds,
    balances: summary.dudeIds.reduce((acc, id) => ({
      ...acc,
      [id]: summary.spentOnAmounts[id] - summary.spentAmounts[id]
    }), {}),
    credits: summary.dudeIds.reduce((acc, id) => ({
      ...acc,
      [id]: summary.dudeIds.reduce((acc, innerId) => acc.concat(summary.debts[innerId].filter(x => x.dudeId === id).map(x => ({ dudeId: innerId, amount: x.amount }))), [])
    }), {}),
    debts: summary.debts,
    groupTotal: summary.groupTotal.toFixed(2),
    spentAmounts: summary.spentAmounts,
    spentOnAmounts: summary.spentOnAmounts
  }
}

const Summary = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    {props.ids.map(id => (
      <DudeSummary id={id} credits={props.credits[id]} debts={props.debts[id]} balance={props.balances[id]} amountSpent={props.spentAmounts[id]} amountSpentOn={props.spentOnAmounts[id]}/>
    ))}
  </div>
)

export default connect(mapStateToProps)(Summary)
