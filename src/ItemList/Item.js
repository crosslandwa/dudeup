import React from 'react'
import { connect } from 'react-redux'
import {
  itemCostSplittingSelector,
  itemDescriptionSelector, updateItemDescription,
  itemBoughtByDudeIdSelector, itemPriceSelector, updateItemBoughtBy,
  removeItem
} from './interactions'
import AddDudeModal from './AddDudeModal'
import DudeList from '../DudeList'
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

    const openModal = id => {
      this.setState({ modalOpen: id })
    }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }

    this.openSplitCostModal = () => {
      openModal('splitCost')
    }

    this.updateItemDude = e => {
      const dudeId = e.target.value
      if (dudeId === '_add_dude_') {
        openModal('addDude')
      } else {
        this.props.updateItemBoughtBy(dudeId, this.props.price)
      }
    }
  }

  render () {
    const {
      description, dudeId, id, price, sharingLabel,
      remove, updateDescription, updateItemBoughtBy
    } = this.props
    return (
      <div style={{ margin: '0.5em' }}>
        <DudeList
          customOptions={[{id: '_add_dude_', label: 'Add dude'}]}
          selectedId={dudeId}
          onChange={this.updateItemDude}
        />
        <input style={textInputStyle} placeholder="item description" value={description} onChange={updateDescription} />
        <input style={textInputStyle} type="number" step="0.01" onChange={e => updateItemBoughtBy(dudeId, e.target.value)} placeholder="0" value={price !== 0 ? price : ''} />
        <input style={textButtonStyle} type="button" value="remove" onClick={remove} />
        <div
          style={{
            ...fauxLinkStyle,
            width: 'fit-content'
          }}
          title="Update item sharing details"
          onClick={this.openSplitCostModal}
        >
          {sharingLabel}
        </div>
        {this.state.modalOpen === 'splitCost' && (
          <SplitCostModal closeModal={this.closeModal} itemId={id} />
        )}
        {this.state.modalOpen === 'addDude' && (
          <AddDudeModal closeModal={this.closeModal} itemId={id} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
