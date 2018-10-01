import React from 'react'
import { connect } from 'react-redux'
import { clear } from './interactions'
import { textButtonStyle } from '../styles'

const Clear = props => (
  <div>
    <input style={textButtonStyle} type="button" onClick={props.clear} value="Clear" />
  </div>
)

export default connect(null, { clear })(Clear)
