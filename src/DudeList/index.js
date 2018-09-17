import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'

const mapStateToProps = state => ({
  ids: dudeIdsSelector(state)
})

const Dude = connect((state, { id }) => ({
  name: dudeNameSelector(state, id)
}))(props => (
  <option value={props.id}>{props.name}</option>
))

const DudeList = props => (
  <select>
    <option />
    {props.ids.map(id => <Dude id={id} />)}
  </select>
)

export default connect(mapStateToProps)(DudeList)
