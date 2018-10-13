import React from 'react'
import { connect } from 'react-redux'
import {
  itemCostSplittingSelector,
  itemDescriptionSelector, updateItemDescription,
  itemBoughtByDudeIdSelector, itemPriceSelector, updateItemBoughtBy,
  removeItem
} from './interactions'
import SelectOrAddDude from './SelectOrAddDude'
import { dudeNameSelector } from '../DudeList/interactions'
import SplitCostModal from '../SplitCostModal'
import { fauxLinkStyle, textButtonStyle, textInputStyle } from '../styles'

const mapStateToProps = (state, { id }) => {
  const costSplit = itemCostSplittingSelector(state, id)
  return {
    description: itemDescriptionSelector(state, id),
    dudeId: itemBoughtByDudeIdSelector(state, id),
    price: itemPriceSelector(state, id),
    sharingLabel: Object.keys(costSplit).length
      ? `Shared by ${Object.keys(costSplit).map(dudeId => `${dudeNameSelector(state, dudeId)} (${costSplit[dudeId].toFixed(2)})`).join(', ')}`
      : 'Shared between everyone'
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  remove: e => dispatch(removeItem(id)),
  updateDescription: e => dispatch(updateItemDescription(id, e.target.value)),
  updateItemBoughtBy: (dudeId, price) => dispatch(updateItemBoughtBy(id, dudeId, price))
})

class Item extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    this.openModal = () => {
      this.setState({ modalOpen: true })
    }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }

    this.updateItemBoughtByDude = dudeId => {
      this.props.updateItemBoughtBy(dudeId, this.props.price)
    }

    this.updateItemPrice = e => {
      this.props.updateItemBoughtBy(this.props.dudeId, e.target.value)
    }
  }

  render () {
    const {
      description, dudeId, id, price, sharingLabel,
      remove, updateDescription
    } = this.props
    return (
      <div style={{ margin: '0.5em' }}>
        <SelectOrAddDude itemId={id} selectedId={dudeId} onChange={this.updateItemBoughtByDude}/>
        <input style={textInputStyle} placeholder="item description" value={description} onChange={updateDescription} />
        <input style={textInputStyle} type="number" step="0.01" onChange={this.updateItemPrice} placeholder="0" value={price !== 0 ? price : ''} />
        <input style={textButtonStyle} type="button" value="remove" onClick={remove} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Item)
