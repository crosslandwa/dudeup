import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import DudeList from '../DudeList'
import { removeDude } from '../DudeList/interactions'

class RemoveDudeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { id: undefined }

    this.removeDude = () => {
      this.state.id && this.props.removeDude(this.state.id)
      props.closeModal()
    }

    this.selectDude = e => { this.setState({ id: e.target.value }) }
  }

  render () {
    return (
      <Modal onCancel={this.props.closeModal} onSubmit={this.removeDude}>
        <DudeList onChange={this.selectDude} />
      </Modal>
    )
  }
}

export default connect(null, { removeDude })(RemoveDudeModal)
