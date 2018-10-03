import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'
import { selectButtonStyle } from '../styles'

const mapStateToProps = state => ({
  ids: dudeIdsSelector(state)
})

const mapDudeIdToName = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const Dude = connect(mapDudeIdToName)(props => (
  <option
    value={props.id}
    selected={props.selected}
  >
    {props.name}
  </option>
))

const DudeList = props => (
  <select style={selectButtonStyle} autoFocus onChange={props.onChange}>
    <option value={''} >Select a dude...</option>
    {props.ids.map(id => <Dude id={id} selected={id === props.selectedId}/>)}
  </select>
)

export default connect(mapStateToProps)(DudeList)
