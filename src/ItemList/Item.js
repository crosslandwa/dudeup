import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemDudeSelector, updateItemDude,
  itemIsUnequalSplitSelector,
  itemIsSharedByAllSelector,
  itemPriceSelector, updateItemPrice,
  removeItem
} from './interactions'
import { Select as DudeList } from '../DudeList'
import { openModal as openSplitCostModal } from '../SplitCostModal/interactions'

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id),
  dudeId: itemDudeSelector(state, id),
  isSharedByAll: itemIsSharedByAllSelector(state, id),
  isUnequalSplit: itemIsUnequalSplitSelector(state, id),
  price: itemPriceSelector(state, id)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  openSplitCostModal: e => dispatch(openSplitCostModal(id)),
  remove: e => dispatch(removeItem(id)),
  updateDescription: e => dispatch(updateItemDescription(id, e.target.value)),
  updateDude: e => dispatch(updateItemDude(id, e.target.value)),
  updatePrice: e => dispatch(updateItemPrice(id, e.target.value))
})

const Item = props => (
  <div>
    <DudeList selectedId={props.dudeId} onChange={props.updateDude} />
    <input placeholder="item description" value={props.description} onChange={props.updateDescription} />
    <input type="number" step="0.01" onChange={props.updatePrice} placeholder="0" value={props.price !== 0 ? props.price : ''} />
    <input
      type="button"
      value={`Split ${props.isUnequalSplit ? 'unequally' : 'equally'} between ${props.isSharedByAll ? 'all' : 'some'} dudes`}
      onClick={props.openSplitCostModal}
    />
    <input type="button" value="remove" onClick={props.remove} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Item)
