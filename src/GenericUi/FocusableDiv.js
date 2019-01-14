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

class FocusableDiv extends React.Component {
  constructor (props) {
    super(props)

    this.captureRef = node => {
      this.ref = node
    }

    this.focus = () => {
      this.ref.focus()
    }
  }

  render () {
    const { children, onClick } = this.props
    return (
      <div ref={this.captureRef} {...this.props} tabindex="0" onKeyDown={bindEnterKeyTo(onClick)} >
        {children}
      </div>
    )
  }
}

export default FocusableDiv
