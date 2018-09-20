import React from 'react'
import { connect } from 'react-redux'
import { modalRemoveDude, isModalOpenSelector } from './interactions'
import Modal from '../Modal'
import DudeList from '../DudeList'

const mapStateToProps = state => ({
  isOpen: isModalOpenSelector(state)
})
const mapDispatchToProps = { modalRemoveDude }

class RemoveDudeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { id: undefined }

    this.handleInput = event => {
      this.setState({ id: event.target.value })
    }
  }

  render () {
    return this.props.isOpen && (
      <Modal onSubmit={() => this.props.modalRemoveDude(this.state.id)}>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>
            Remove:
            <DudeList onChange={this.handleInput} />
          </label>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDudeModal)
