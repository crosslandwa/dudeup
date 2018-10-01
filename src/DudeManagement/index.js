import React from 'react'
import { connect } from 'react-redux'
import { openModal as openAddDudeModal } from '../AddDudeModal/interactions'
import { openModal as openRemoveDudeModal } from '../RemoveDudeModal/interactions'
import { textButtonStyle } from '../styles'

const mapDispatchToProps = { openAddDudeModal, openRemoveDudeModal }

const DudeManagement = props => (
  <div>
    <input style={textButtonStyle} type="button" value="Add Dude" onClick={props.openAddDudeModal} />
    <input style={textButtonStyle} type="button" value="Remove Dude" onClick={props.openRemoveDudeModal} />
  </div>
)

export default connect(null, mapDispatchToProps)(DudeManagement)
