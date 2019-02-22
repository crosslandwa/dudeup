import React from 'react'
import { highlightColor } from '../styles'

const addHighlight = children => React.Children.map(
  children,
  child => React.cloneElement(
    child,
    { highlight: true, style: { ...child.props.style, boxShadow: `inset 0 0 0.1em 0.1em ${highlightColor}` } }
  )
)

export const WithFlyoutArrowBelow = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    alignItems: 'center'
  }}>
    {props.show ? addHighlight(props.children) : props.children}
    {props.show && (
      <div style={{
        border: 'solid transparent',
        content: ' ',
        pointerEvents: 'none',
        borderColor: 'rgba(136, 183, 213, 0)',
        borderBottomColor: highlightColor,
        borderWidth: '1em',
        marginTop: '-1em',
        width: 0
      }}></div>
    )}
  </div>
)
