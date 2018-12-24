import React from 'react'
import Dividor from '../GenericUi/Dividor'

const Section = props => (
  <div style={props.spaceAbove ? { marginTop: '0.5em' } : {} }>
    <h2 style={{
      margin: 0
    }}>{props.title}</h2>
    <Dividor />
    <div>
      {props.children}
    </div>
  </div>
)

export default Section
