import React from 'react'
import { connect } from 'react-redux'
import { closeModal } from './interactions'
import { textButtonStyle } from '../styles'

const mapDispatchToProps = (dispatch, { onSubmit }) => ({
  closeModal: () => dispatch(closeModal()),
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
        this.props.closeModal()
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
        backgroundColor: '#80808080',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
      }}>
        <div style={{
          width: '50vw',
          height: '50vw',
          backgroundColor: 'white'
        }}>
          <form onSubmit={this.props.onSubmit} >
            {this.props.children}
            <div>
              <input style={textButtonStyle} type="button" value="Cancel" onClick={this.props.closeModal} />
              <input style={textButtonStyle} type="submit" value="OK"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Modal)
