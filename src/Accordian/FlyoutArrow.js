import React from 'react'

const grey = '#eff0f1'

export const flyoutHighlight = {
  backgroundColor: grey
}

export const WithFlyoutArrowBelow = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    alignItems: 'center'
  }}>
    {props.children}
    {props.show && (
      <div style={{
        border: 'solid transparent',
        content: ' ',
        pointerEvents: 'none',
        borderColor: 'rgba(136, 183, 213, 0)',
        borderBottomColor: grey,
        borderWidth: '1em',
        marginTop: '-1em',
        width: 0
      }}></div>
    )}
  </div>
)
