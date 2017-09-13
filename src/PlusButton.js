import React, { Component } from 'react'

const style = {
  borderRadius: '50%',
  lineHeight: '32px',
  width: 32,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  backgroundColor: '#e9ffee',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  fontWeight: 'bold',
  cursor: 'pointer'
}

class PlusButton extends Component {
  render() {
    return (
      <div style={style} >
        <span>+</span>
      </div>
    )
  }
}

export default PlusButton
