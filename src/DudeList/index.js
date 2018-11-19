import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'
import { dropdownStyle } from '../styles'

const includeAll = id => true

const mapStateToProps = (state, { filter = includeAll }) => ({
  dudes: dudeIdsSelector(state).filter(filter).map(id => ({ id, name: dudeNameSelector(state, id) }))
})

const DudeList = ({ customActions = [], dudes, onChange, selectedId = '' }) => (
  <select style={dropdownStyle} value={selectedId} autoFocus onChange={onChange}>
    <option value={''} disabled >Select a dude...</option>
    {dudes.map(({ id, name }) => <option value={id}>{name}</option>)}
    {customActions.length && <option disabled>───────</option>}
    {customActions.map(({ id, label }) => <option value={id} >{label}</option>)}
  </select>
)

export default connect(mapStateToProps)(DudeList)
