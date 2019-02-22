import React from 'react'
import { connect } from 'react-redux'
import { secondaryTextButtonStyle } from '../styles'
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
          <Modal onCancel={this.closeModal} onSubmit={this.closeModal} title="About" >
            <div style={{ fontSize: '0.8em' }}>
              <p>Take the maths out of settling up the cost of group activities.</p>
              <ul>
                <li>Add dudes <em>(Press "Add dude")</em></li>
                <li>Record bought items <em>(Press "Add item")</em></li>
                <li>Note how much was spent on each item and (optionally) who shared it <em>(Click an item to edit it)</em></li>
              </ul>
              <p>DUDE UP displays a summary of how much each group member should pay to others to settle up</p>
              <h4>What about my data?</h4>
              <p>Your DUDE UP list is stored on your device - no other data is recorded or collected</p>
              <p>Sadly, this means you can't share lists with other people or devices...</p>
            </div>
          </Modal>
        )}
        <input style={secondaryTextButtonStyle} type="button" onClick={this.openModal} value="About" />
      </React.Fragment>
    )
  }
}

export default connect(null)(About)
