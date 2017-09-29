import React, { Component } from 'react'

const styles = {
  display: 'flex',
  width: '100%',
  minHeight: 62,
  justifyContent: 'space-around',
  height: '100%',
  alignItems: 'center',
  lineHeight: 'initial'
}

class LoadingBadge extends Component {
  render() {
    return (
      <div style={styles} >
        Loading ...
      </div>
    )
  }
}

export default LoadingBadge
