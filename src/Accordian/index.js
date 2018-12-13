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

    this.captureRef = node => this.ref = node

    this.clickOutsideFunction = e => {
      if (this.ref && !this.ref.contains(e.target)) {
        this.props.onCancel()
      }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.escFunction, false)
    document.addEventListener('click', this.clickOutsideFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false)
    document.removeEventListener('click', this.clickOutsideFunction, false)
  }

  render () {
    return (
      <div ref={this.captureRef} style={{
        backgroundColor: '#eff0f1',
        padding: '0.5em'
      }}>
        <ClosingCross onClick={this.props.onCancel} />
        <h3 style={{ margin: '0 0 0.5em 0', textAlign: 'center' }}>{this.props.title}</h3>
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
