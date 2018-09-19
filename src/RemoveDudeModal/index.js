import React from 'react'
import { connect } from 'react-redux'
import { closeModal, isModalOpenSelector } from './interactions'
import Modal from '../Modal'
import { removeDude } from '../DudeList/interactions'
import DudeList from '../DudeList'

const RemoveDudeButton = connect(
  null,
  (dispatch, { name }) => ({
    addDude: event => {
      dispatch(removeDude(name))
      dispatch(closeModal())
    }
  })
)(props => (
  <input type="button" value="OK" onClick={props.addDude} />
))

const mapStateToProps = state => ({
  isOpen: isModalOpenSelector(state)
})
const mapDispatchToProps = { closeModal }

class RemoveDudeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: undefined }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }
  }

  render () {
    return this.props.isOpen && (
      <Modal>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>
            Remove:
            <DudeList />
          </label>
          <div>
            <input type="button" value="Cancel" onClick={this.props.closeModal} />
            <RemoveDudeButton name={this.state.name} />
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDudeModal)
