import React from 'react'
import Dividor from '../GenericUi/Dividor'

const Section = ({ children, dividor = true, title }) => (
  <div style={{ marginTop: '2em' }}>
    {title && (
      <h2 style={{
        margin: 0,
        fontSize: '1.25em'
      }}>{title}</h2>
    )}
    {dividor && <Dividor />}
    <div>
      {children}
    </div>
  </div>
)

export default Section
