import React from 'react'
import { textButtonStyle } from '../styles'

const highlightColor = '#2196f3'

const AddIcon = ({ highlight }) => (
  <div style={{
    background: highlight ? highlightColor : '',
    borderRadius: '50%',
    height: '1.5em',
    width: '1.5em',
    lineHeight: '1.5em',
    textAlign: 'center'
  }}>+</div>
)

class AddButton extends React.Component {
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
    const { label, onClick } = this.props
    const highlight = this.props.highlight || this.state.hover

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
        onClick={onClick}
        onMouseEnter={this.onHover}
        onMouseLeave={this.endHover}
      >
        <AddIcon highlight={highlight} />
        <input style={{
          ...textButtonStyle,
          color: highlight ? highlightColor : '',
          border: 'none',
          padding: '0.2em 0em 0.2em 0.05em',
          textAlign: 'left'
        }}
          type="button"
          value={label}
        />
      </div>
    )
  }
}

export default AddButton
