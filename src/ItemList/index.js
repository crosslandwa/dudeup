import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import Item from './Item'
import { textButtonStyle } from '../styles'
import RemoveDudeAccordian from '../DudeList/RemoveDudeAccordian'
import { flyoutHighlight, WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

class ItemList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { removeDudeOpen: false }
    this.closeModal = () => {
      this.setState({ removeDudeOpen: false })
    }
    this.openModal = () => {
      this.setState({ removeDudeOpen: true })
    }
  }

  render () {
    return (
      <div>
        <div>
          {this.props.ids.map(id => <Item id={id} />)}
        </div>
        <input style={{ ...textButtonStyle, display: 'block' }} type="button" onClick={this.props.addItem} value="Add item" />
        <WithFlyoutArrowBelow show={this.state.removeDudeOpen}>
          <input style={{ ...textButtonStyle, ...(this.state.removeDudeOpen ? flyoutHighlight : {}) }} type="button" value="Remove dude" onClick={this.openModal} />
        </WithFlyoutArrowBelow>
        {this.state.removeDudeOpen && <RemoveDudeAccordian close={this.closeModal} />}
      </div>
    )
  }
}

export default connect(mapStateToProps, { addItem })(ItemList)
