import React from 'react'
import { connect } from 'react-redux'
import { dudesInDebtSummarySelector } from './interactions'
import DudeSummary from './DudeSummary'

const mapStateToProps = state => {
  const summary = dudesInDebtSummarySelector(state)
  return {
    ids: summary.dudeIds,
    debts: summary.debts,
    groupTotal: summary.groupTotal.toFixed(2),
    spentAmounts: summary.spentAmounts
  }
}

const Summary = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div>
      <div>Group total: {props.groupTotal}</div>
      {props.ids.map(id => (
        <DudeSummary id={id} debts={props.debts[id]} amountSpent={props.spentAmounts[id]}/>
      ))}
    </div>
  </div>
)

export default connect(mapStateToProps)(Summary)
