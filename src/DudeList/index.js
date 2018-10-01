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
    <option>Select a dude...</option>
    {props.ids.map(id => <Dude id={id} selected={id === props.selectedId}/>)}
  </select>
)

const CheckBoxOption = connect(mapDudeIdToName)(props => (
  <label>
    {props.name}
    <input
      type="checkbox"
      value={props.id}
      checked={props.selected}
      onChange={props.onChange}
    />
  </label>
))

const DudeCheckBoxList = props => (
  <div>
    {props.ids.map(id => <CheckBoxOption id={id} selected={props.selectedIds.includes(id)} onChange={e => props.onChange(id, e.target.checked)}/>)}
  </div>
)

export const Select = connect(mapStateToProps)(DudeList)
export const CheckBoxList = connect(mapStateToProps)(DudeCheckBoxList)
