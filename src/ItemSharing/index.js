import React from 'react'
import { connect } from 'react-redux'
import { itemCostSplittingSelector } from '../ItemList/interactions'
import { dudeNameSelector } from '../DudeList/interactions'
import { fauxLinkStyle } from '../styles'
import SplitCostModal from './SplitCostModal'

const mapStateToProps = (state, { id }) => {
  const costSplit = itemCostSplittingSelector(state, id)
  return {
    sharingLabel: Object.keys(costSplit).length
      ? `Shared by ${Object.keys(costSplit).map(dudeId => `${dudeNameSelector(state, dudeId)} (${costSplit[dudeId].toFixed(2)})`).join(', ')}`
      : 'Shared between everyone'
  }
}

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
