import React from 'react'
import { connect } from 'react-redux'
import { dudesInDebtIdSelector } from './interactions'
import DudeSummary from './DudeSummary'

const mapStateToProps = state => ({
  ids: dudesInDebtIdSelector(state)
})

const Summary = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div>
      {!props.ids.length && <div>Everyone is all square!</div>}
      {props.ids.map(id => <DudeSummary id={id} />)}
    </div>
  </div>
)

export default connect(mapStateToProps)(Summary)
