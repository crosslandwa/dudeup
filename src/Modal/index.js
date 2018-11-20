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

class Modal extends React.Component {
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
        width: '100%',
        height: '100%',
        backgroundColor: '#303030E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0
      }}>
        <div style={{
          maxWidth: '50%',
          minWidth: '17em',
          height: '66%',
          backgroundColor: 'white',
          borderRadius: '0.5em',
          padding: '1em'
        }}>
          <ClosingCross onClick={this.props.onCancel} />
          <h2 style={{ marginTop: 0, textAlign: 'center' }}>{this.props.title}</h2>
          <form onSubmit={this.props.onSubmit} >
            {this.props.children}
            <div>
              <input style={textButtonStyle} type="button" value="Cancel" onClick={this.props.onCancel} />
              <input style={textButtonStyle} type="submit" value={this.props.submitButtonText || 'OK'}/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Modal)
