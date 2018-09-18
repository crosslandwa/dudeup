import React from 'react'

const Modal = props => (
  <div style={{
    width: '100vw',
    height: '100vw',
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      width: '50vw',
      height: '50vw',
      backgroundColor: 'white'
    }}>
      {props.children}
    </div>
  </div>
)

export default Modal
