import React from 'react'

export const flyoutHighlight = {
  backgroundColor: '#eff0f1'
}

export const WithFlyoutArrowBelow = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    alignItems: 'center'
  }}>
    {props.children}
    <div style={{
      border: 'solid transparent',
      content: ' ',
      pointerEvents: 'none',
      borderColor: 'rgba(136, 183, 213, 0)',
      borderBottomColor: '#eff0f1',
      borderWidth: '1em',
      marginTop: '-1em',
      width: 0
    }}></div>
  </div>
)
