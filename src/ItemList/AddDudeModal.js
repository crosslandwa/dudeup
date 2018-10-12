import React from 'react'
import { connect } from 'react-redux'
import { addDudeAndAssignToItem } from './interactions'
import Modal from '../Modal'
import { textInputStyle } from '../styles'

class AddDudeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: undefined }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }

    this.submit = () => {
      this.state.name && this.props.addDudeAndAssignToItem(this.state.name, this.props.itemId)
      this.props.closeModal()
    }
  }

  render () {
    return (
      <Modal onCancel={this.props.closeModal} onSubmit={this.submit} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>
            Name:
            <input style={textInputStyle} autoFocus type="textbox" onChange={this.handleTextInput}/>
          </label>
        </div>
      </Modal>
    )
  }
}

export default connect(null, { addDudeAndAssignToItem })(AddDudeModal)
