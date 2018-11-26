import React from 'react'

const ClosingCross = props => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', height: 0 }}>
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
