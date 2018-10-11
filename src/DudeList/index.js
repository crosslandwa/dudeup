import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'
import { dropdownStyle } from '../styles'

const mapStateToProps = state => ({
  dudes: dudeIdsSelector(state).map(id => ({ id, name: dudeNameSelector(state, id) }))
})

const DudeList = ({ customOptions = [], dudes, onChange, selectedId }) => (
  <select style={dropdownStyle} autoFocus onChange={onChange}>
    <option value={''} >Select a dude...</option>
    {dudes.map(({ id, name }) => (
      <option
        value={id}
        selected={id === selectedId}
      >
        {name}
      </option>
    ))}
    {customOptions.length && <option disabled>───────</option>}
    {customOptions.map(({ id, label }) => <option value={id} >{label}</option>)}
  </select>
)

export default connect(mapStateToProps)(DudeList)
