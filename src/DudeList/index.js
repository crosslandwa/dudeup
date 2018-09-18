import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'

const mapStateToProps = state => ({
  ids: dudeIdsSelector(state)
})

const Dude = connect((state, { id }) => ({
  name: dudeNameSelector(state, id)
}))(props => (
  <option
    value={props.id}
    selected={props.selected}
  >
    {props.name}
  </option>
))

const DudeList = props => (
  <select onChange={props.onChange}>
    <option />
    {props.ids.map(id => <Dude id={id} selected={id === props.selectedId}/>)}
  </select>
)

export default connect(mapStateToProps)(DudeList)
