import React from 'react'
import { connect } from 'react-redux'
import { openModal as openAddDudeModal } from '../AddDudeModal/interactions'

const mapDispatchToProps = { openAddDudeModal }

const DudeManagement = props => (
  <div>
    <input type="button" value="Add Dude" onClick={props.openAddDudeModal} />
  </div>
)

export default connect(null, mapDispatchToProps)(DudeManagement)
