import React from 'react'

const bindEnterKeyTo = f => event => {
  if (event.keyCode === 13) {
    event.preventDefault()
    f()
  }
}

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
