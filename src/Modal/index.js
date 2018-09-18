import React from 'react'

const Modal = props => (
  <div style={{
    width: '100%',
    height: '100%',
    backgroundColor: '#80808080',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
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
