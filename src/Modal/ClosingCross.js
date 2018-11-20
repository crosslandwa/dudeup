import React from 'react'
import { connect } from 'react-redux'

const ClosingCross = props => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <div
      {...props}
      style={{
        cursor: 'pointer',
        display: 'contents'
      }}
    >
      ✕
    </div>
  </div>
)

export default ClosingCross
