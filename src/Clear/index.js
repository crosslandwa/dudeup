import React from 'react'
import { connect } from 'react-redux'
import { clear } from './interactions'
import { addNotification } from '../Notifications/interactions'
import { secondaryTextButtonStyle, secondaryTextItalic, textButtonStyle } from '../styles'
import Modal from '../Modal'

class Clear extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modal: false }

    this.openModal = () => {
      this.setState({ modal: true })
    }

    this.closeModal = () => {
      this.setState({ modal: false })
    }

    this.clear = () => {
      this.props.clear()
      this.props.addNotification('All Dudes and Items have been cleared')
      this.closeModal()
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.state.modal && (
          <Modal onCancel={this.closeModal} onSubmit={this.clear} title="Clear" >
            <div>
              <span>Clearing will remove all Dudes and Items from your device. Click the OK button to proceed</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2.5em' }}>
              <input autoFocus style={textButtonStyle} type="button" value="Cancel" onClick={this.closeModal} />
              <input style={textButtonStyle} type="submit" value="OK" />
            </div>
            <div style={{ ...secondaryTextItalic, marginTop: '2em', textAlign: 'center' }}>
              <em>This can not be undone</em>
            </div>
          </Modal>
        )}
        <input style={secondaryTextButtonStyle} type="button" onClick={this.openModal} value="Clear" />
      </React.Fragment>
    )
  }
}

export default connect(null, { addNotification, clear })(Clear)
