import React from 'react'
import { connect } from 'react-redux'
import { dudesInDebtSummarySelector } from './interactions'
import DudeSummary from './DudeSummary'

const mapStateToProps = state => {
  const summary = dudesInDebtSummarySelector(state)
  return {
    averageAmountPerDude: summary.averageAmountPerDude.toFixed(2),
    ids: summary.dudeIds,
    debts: summary.debts,
    groupTotal: summary.groupTotal.toFixed(2)
  }
}

const Summary = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div>
      <div>Group total: {props.groupTotal} ({props.averageAmountPerDude} per Dude)</div>
      {!props.ids.length && <div>Everyone is all square!</div>}
      {props.ids.map(id => <DudeSummary id={id} debts={props.debts[id]} />)}
    </div>
  </div>
)

export default connect(mapStateToProps)(Summary)
