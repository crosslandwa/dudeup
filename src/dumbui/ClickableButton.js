import React, { Component } from 'react'

const styles = {
  background: 'none',
  border: 'solid 1px',
  font: 'inherit',
  cursor: 'pointer',
  height: '30px',
  fontSize: 'inherit',
  borderRadius: 5
}

const noop = () => {}

class ClickableButton extends Component {
  render() {
    return (
      <input
        style={{...styles, ...this.props.style}}
        className={this.props.className}
        type="button"
        value={this.props.value}
        onClick={this.props.onClick || noop}
      />
    )
  }
}

export default ClickableButton
