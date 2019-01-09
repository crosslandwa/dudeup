import React from 'react'
import { connect } from 'react-redux'
import ClosingCross from './ClosingCross'

const mapDispatchToProps = (dispatch, { onCancel, onSubmit }) => ({
  onSubmit: event => {
    event.preventDefault()
    onSubmit()
  }
})

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.escFunction = event => {
      if (event.keyCode === 27) {
        this.props.onCancel()
      }
    }

    this.captureRef = node => {
      this.ref = node
    }

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
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#303030E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2
      }}>
        <div
          style={{
            maxWidth: '50%',
            minWidth: '17em',
            height: '66%',
            backgroundColor: 'white',
            borderRadius: '0.5em',
            padding: '1em'
          }}
          ref={this.captureRef}
        >
          <ClosingCross onClick={this.props.onCancel} />
          <h3 style={{ marginTop: 0, textAlign: 'center' }}>{this.props.title}</h3>
          <form onSubmit={this.props.onSubmit} >
            {this.props.children}
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Modal)
