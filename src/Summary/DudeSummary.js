import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from '../DudeList/interactions'

const mapStateToProps = (state, { id, debts }) => ({
  name: dudeNameSelector(state, id),
  debts: debts.map(({ dudeId, amount }) => ({
    name: dudeNameSelector(state, dudeId), amount
  }))
})

const DudeSummary = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div>{props.name} owes...</div>
    {!props.debts.length && <div>nothing</div>}
    {props.debts.map(({ name, amount }) => (
      <div>{amount} to {name}</div>
    ))}
  </div>
)

export default connect(mapStateToProps)(DudeSummary)
