import React from 'react'
import { connect } from 'react-redux'
import { clear } from './interactions'

const Clear = props => (
  <div>
    <input type="button" onClick={props.clear} value="Clear" />
  </div>
)

export default connect(null, { clear })(Clear)
