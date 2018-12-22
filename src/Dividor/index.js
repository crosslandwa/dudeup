import React from 'react'

const Dividor = props => (
  <div style={{
    marginTop: props.withTopMargin ? '0.5em' : '',
    marginBottom: '0.5em',
    borderBottom: '1px solid #808080'
  }}></div>
)

export default Dividor
