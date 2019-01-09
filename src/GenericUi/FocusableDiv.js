import React from 'react'

const noOp = () => {}

const bindEnterKeyTo = f => f
  ? event => {
    if (event.keyCode === 13) {
      event.preventDefault()
      f()
    }
  }
  : noOp

const FocusableDiv = props => (
  <div {...props} tabindex="0" onKeyDown={bindEnterKeyTo(props.onClick)} >
    {props.children}
  </div>
)

export default FocusableDiv
