import React from 'react'
import { connect } from 'react-redux'
import { itemSharingLabelSelector } from '../ItemList/interactions'
import { fauxLinkStyle } from '../styles'
import SplitCostAccordian from './SplitCostAccordian'
import { flyoutHighlight, WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = (state, { id }) => ({
  sharingLabel: itemSharingLabelSelector(state, id)
})

class ItemSharing extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }

    this.openSharing = () => {
      this.setState({ open: true })
    }

    this.closeSharing = () => {
      this.setState({ open: false })
    }
  }

  render () {
    const { id, sharingLabel } = this.props

    const Link = props => (
      <div
        style={{
          ...fauxLinkStyle,
          ...props.style,
          width: 'fit-content'
        }}
        title="Update item sharing details"
        onClick={this.openSharing}
      >
        {sharingLabel}
      </div>
    )

    return (
      <div>
        <WithFlyoutArrowBelow show={this.state.open} >
          <Link style={{ ...(this.state.open ? flyoutHighlight : {}) }} />
        </WithFlyoutArrowBelow>
        {this.state.open && <SplitCostAccordian close={this.closeSharing} itemId={id} />}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemSharing)
