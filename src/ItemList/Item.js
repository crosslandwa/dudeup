import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemDudeSelector, updateItemDude,
  itemPriceSelector, updateItemPrice
} from './interactions'
import DudeList from '../DudeList'

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id),
  dudeId: itemDudeSelector(state, id),
  price: itemPriceSelector(state, id)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  updateDescription: e => dispatch(updateItemDescription(id, e.target.value)),
  updateDude: e => dispatch(updateItemDude(id, e.target.value)),
  updatePrice: e => dispatch(updateItemPrice(id, e.target.value))
})

const Item = props => (
  <div>
    <DudeList selectedId={props.dudeId} onChange={props.updateDude} />
    <input placeholder="item description" value={props.description} onChange={props.updateDescription} />
    <input type="number" step="0.01" onChange={props.updatePrice} value={props.price} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Item)
