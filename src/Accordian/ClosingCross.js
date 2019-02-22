import React from 'react'
import { highlightColor } from '../styles'

class ClosingCross extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hover: false
    }

    this.onHover = () => {
      this.setState({ hover: true })
    }

    this.endHover = () => {
      this.setState({ hover: false })
    }
  }

  render () {
    return (
      <div
        onMouseEnter={this.onHover}
        onMouseLeave={this.endHover}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          height: '1.5em',
          marginBottom: '-1.4em'
        }}
        {...this.props}
      >
        <div
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            background: this.state.hover ? highlightColor : '',
            borderRadius: '50%',
            height: '1.5em',
            width: '1.5em',
            lineHeight: '1.5em'
          }}
        >
          ✕
        </div>
      </div>
    )
  }
}

export default ClosingCross
