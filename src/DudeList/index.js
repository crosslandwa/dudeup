import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'
import { dropdownStyle } from '../styles'

const mapStateToProps = (state) => ({
  dudes: dudeIdsSelector(state)
    .map(id => ({ id, name: dudeNameSelector(state, id) }))
})

const DudeList = ({ dudes, onChange, selectedId = '', style }) => (
  <select style={{ ...dropdownStyle, ...style }} value={selectedId} onChange={onChange}>
    <option value={''} disabled >Select a dude...</option>
    {dudes.map(({ id, name }) => <option value={id}>{name}</option>)}
  </select>
)

export default connect(mapStateToProps)(DudeList)
