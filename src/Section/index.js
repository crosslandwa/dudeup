import React from 'react'

const Dividor = props => (
  <div style={{
    marginBottom: '0.5em',
    borderBottom: '1px solid #808080'
  }}></div>
)

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
