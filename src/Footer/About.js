import React from 'react'
import { connect } from 'react-redux'
import { textButtonStyle } from '../styles'
import Modal from '../Modal'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modal: false }

    this.openModal = () => {
      this.setState({ modal: true })
    }

    this.closeModal = () => {
      this.setState({ modal: false })
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.state.modal && (
          <Modal onCancel={this.closeModal} onSubmit={this.closeModal} title="Dude Up" >
            <div>
              <p>Tell me all about DudeUp</p>
              <p>Really, I'm interested...</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5em' }}>
              <input autoFocus style={textButtonStyle} type="submit" value="OK" />
            </div>
          </Modal>
        )}
        <input style={textButtonStyle} type="button" onClick={this.openModal} value="About" />
      </React.Fragment>
    )
  }
}

export default connect(null)(About)
