import React from 'react'
import { connect } from 'react-redux'
import { textButtonStyle } from '../styles'
import ClosingCross from './ClosingCross'

const mapDispatchToProps = (dispatch, { onCancel, onSubmit }) => ({
  onSubmit: event => {
    event.preventDefault()
    onSubmit()
  }
})

class Accordian extends React.Component {
  constructor (props) {
    super(props)

    this.escFunction = event => {
      if (event.keyCode === 27) {
        this.props.onCancel()
      }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  render () {
    return (
      <div style={{
        backgroundColor: '#eff0f1',
        padding: '1em'
      }}>
        <ClosingCross onClick={this.props.onCancel} />
        <h2 style={{ margin: 0, textAlign: 'center' }}>{this.props.title}</h2>
        <form onSubmit={this.props.onSubmit} >
          {this.props.children}
          <div>
            <input style={textButtonStyle} type="button" value="Cancel" onClick={this.props.onCancel} />
            <input style={textButtonStyle} type="submit" value={this.props.submitButtonText || 'OK'}/>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Accordian)
