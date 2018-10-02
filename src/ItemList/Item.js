import React from 'react'
import { connect } from 'react-redux'
import {
  itemCostSplittingSelector,
  itemDescriptionSelector, updateItemDescription,
  itemDudeSelector, updateItemDude,
  itemPriceSelector, updateItemPrice,
  removeItem
} from './interactions'
import DudeList from '../DudeList'
import { dudeNameSelector } from '../DudeList/interactions'
import { openModal as openSplitCostModal } from '../SplitCostModal/interactions'
import { fauxLinkStyle, textButtonStyle, textInputStyle } from '../styles'

const mapStateToProps = (state, { id }) => {
  const costSplit = itemCostSplittingSelector(state, id)
  return {
    description: itemDescriptionSelector(state, id),
    dudeId: itemDudeSelector(state, id),
    price: itemPriceSelector(state, id),
    sharingLabel: Object.keys(costSplit).length
      ? `Shared by ${Object.keys(costSplit).map(dudeId => `${dudeNameSelector(state, dudeId)} (${costSplit[dudeId].toFixed(2)})`).join(', ')}`
      : 'Shared between everyone'
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  openSplitCostModal: e => dispatch(openSplitCostModal(id)),
  remove: e => dispatch(removeItem(id)),
  updateDescription: e => dispatch(updateItemDescription(id, e.target.value)),
  updateDude: e => dispatch(updateItemDude(id, e.target.value)),
  updatePrice: e => dispatch(updateItemPrice(id, e.target.value))
})

const Item = props => (
  <div style={{ margin: '0.5em' }}>
    <DudeList selectedId={props.dudeId} onChange={props.updateDude} />
    <input style={textInputStyle} placeholder="item description" value={props.description} onChange={props.updateDescription} />
    <input style={textInputStyle} type="number" step="0.01" onChange={props.updatePrice} placeholder="0" value={props.price !== 0 ? props.price : ''} />
    <input style={textButtonStyle} type="button" value="remove" onClick={props.remove} />
    <div
      style={{
        ...fauxLinkStyle,
        width: 'fit-content'
      }}
      title="Update item sharing details"
      onClick={props.openSplitCostModal}
    >
      {props.sharingLabel}
    </div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Item)
