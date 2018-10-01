import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemDudeSelector, updateItemDude,
  itemIsUnequalSplitSelector,
  itemIsSharedByAllSelector,
  itemPriceSelector, updateItemPrice,
  itemSharedByDudeIdsSelector,
  removeItem
} from './interactions'
import { Select as DudeList } from '../DudeList'
import { dudeNameSelector } from '../DudeList/interactions'
import { openModal as openSplitCostModal } from '../SplitCostModal/interactions'
import { textButtonStyle } from '../styles'

const sharingLabel = (isSharedByAll, isUnequalSplit, sharingSummary) => {
  switch (true) {
    case (isSharedByAll && !isUnequalSplit):
      return 'Shared by everyone'
    case (isSharedByAll && isUnequalSplit):
    case (!isSharedByAll && isUnequalSplit):
      return `Shared by ${sharingSummary.map(summary => `${summary.name} (${summary.amount.toFixed(2)})`).join(', ')}`
    case (!isSharedByAll && !isUnequalSplit):
      return `Shared by ${sharingSummary.map(summary => summary.name).join(', ')}`
  }
}

const mapStateToProps = (state, { id }) => {
  const isSharedByAll = itemIsSharedByAllSelector(state, id)
  const isUnequalSplit = itemIsUnequalSplitSelector(state, id)
  const sharedDudeIds = itemSharedByDudeIdsSelector(state, id)
  const sharingSummary = sharedDudeIds.map(dudeId => ({
    name: dudeNameSelector(state, dudeId),
    amount: 0
  }))
  return {
    description: itemDescriptionSelector(state, id),
    dudeId: itemDudeSelector(state, id),
    price: itemPriceSelector(state, id),
    sharingLabel: sharingLabel(isSharedByAll, isUnequalSplit, sharingSummary)
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
  <div>
    <DudeList selectedId={props.dudeId} onChange={props.updateDude} />
    <input placeholder="item description" value={props.description} onChange={props.updateDescription} />
    <input type="number" step="0.01" onChange={props.updatePrice} placeholder="0" value={props.price !== 0 ? props.price : ''} />
    <input style={textButtonStyle} type="button" value="remove" onClick={props.remove} />
    <div>{props.sharingLabel}<input style={textButtonStyle} type="button" value="update" onClick={props.openSplitCostModal} /></div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Item)
