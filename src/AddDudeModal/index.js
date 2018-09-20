import React from 'react'
import { connect } from 'react-redux'
import { modalAddDude, isModalOpenSelector } from './interactions'
import Modal from '../Modal'

const mapStateToProps = state => ({
  isOpen: isModalOpenSelector(state)
})
const mapDispatchToProps = { modalAddDude }

class AddDudeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: undefined }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }
  }

  render () {
    return this.props.isOpen && (
      <Modal onSubmit={() => this.props.modalAddDude(this.state.name)} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>
            Name:
            <input autoFocus type="textbox" onChange={this.handleTextInput}/>
          </label>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDudeModal)
