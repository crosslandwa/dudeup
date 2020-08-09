import React from 'react'

class AddButton extends React.Component {
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
    const { label, onClick } = this.props

    return (
      <button
        class="du-button du-button--flyout"
        ref={this.captureRef}
        onClick={onClick}
      >
        {label}
      </button>
    )
  }
}

export default AddButton
