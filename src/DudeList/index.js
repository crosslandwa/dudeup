import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'

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
  <select autoFocus onChange={props.onChange}>
    <option>Select a dude...</option>
    {props.ids.map(id => <Dude id={id} selected={id === props.selectedId}/>)}
  </select>
)

const RadioOption = connect(mapDudeIdToName)(props => (
  <label>
    {props.name}
    <input
      type="radio"
      value={props.id}
      checked={props.selected}
    />
  </label>
))

const DudeRadioList = props => { console.log(props); return (
  <ul>
    {props.ids.map(id => <li><RadioOption id={id} selected={props.selectedIds.includes(id)} /></li>)}
  </ul>
)}

export const Select = connect(mapStateToProps)(DudeList)
export const RadioList = connect(mapStateToProps)(DudeRadioList)
