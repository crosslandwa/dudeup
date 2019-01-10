import React from 'react'
import Dividor from '../GenericUi/Dividor'

const Section = ({ children, dividor = true, spaceAbove, title }) => (
  <div style={spaceAbove ? { marginTop: '3em' } : {} }>
    {title && (
      <h2 style={{
        margin: 0
      }}>{title}</h2>
    )}
    {dividor && <Dividor />}
    <div>
      {children}
    </div>
  </div>
)

export default Section
