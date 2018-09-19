import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from '../DudeList/interactions'
import DudeList from '../DudeList'

const mapStateToProps = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const DudeSummary = props => (
  <div>
    {props.name} owes...
  </div>
)

export default connect(mapStateToProps)(DudeSummary)
