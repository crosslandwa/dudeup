import React from 'react'
import { connect } from 'react-redux'
import { itemSharingLabelSelector } from '../ItemList/interactions'
import { fauxLinkStyle } from '../styles'
import SplitCostModal from './SplitCostModal'

const mapStateToProps = (state, { id }) => ({
  sharingLabel: itemSharingLabelSelector(state, id)
})

class ItemSharing extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    this.openModal = () => {
      this.setState({ modalOpen: true })
    }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }
  }

  render () {
    const { id, sharingLabel } = this.props
    return (
      <div>
        <div
          style={{
            ...fauxLinkStyle,
            width: 'fit-content'
          }}
          title="Update item sharing details"
          onClick={this.openModal}
        >
          {sharingLabel}
        </div>
        {this.state.modalOpen && <SplitCostModal closeModal={this.closeModal} itemId={id} />}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemSharing)
