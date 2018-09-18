import React from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../Modal/interactions'
import { isAddDudeModalOpenSelector, openModal } from './interactions'
import Modal from '../Modal'
import { addDude } from '../DudeList/interactions'

const AddDudeButton = connect(
  null,
  (dispatch, { name }) => ({
    addDude: event => {
      dispatch(addDude(name || undefined))
      dispatch(closeModal())
    }
  })
)(props => (
  <input type="button" value="OK" onClick={props.addDude} />
))

const mapStateToProps = state => ({
  isOpen: isAddDudeModalOpenSelector(state)
})
const mapDispatchToProps = { closeModal, openModal }

class AddDudeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: undefined }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }
  }

  render () {
    return this.props.isOpen
      ? (
        <Modal>
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label>
              Name:
              <input type="textbox" onChange={this.handleTextInput}/>
            </label>
            <div>
              <input type="button" value="Cancel" onClick={this.props.closeModal} />
              <AddDudeButton name={this.state.name} />
            </div>
          </div>
        </Modal>
      ) : (
        <input type="button" value="Add Dude" onClick={this.props.openModal} />
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDudeModal)
