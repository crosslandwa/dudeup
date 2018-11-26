import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemBoughtByDudeIdSelector, itemPriceSelector, updateItemBoughtBy,
  removeItem
} from './interactions'
import SelectOrAddDude from './SelectOrAddDude'
import ItemSharing from '../ItemSharing'
import PriceInput from '../GenericUi/PriceInput'
import { textButtonStyle, textInputStyle } from '../styles'

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id),
  dudeId: itemBoughtByDudeIdSelector(state, id),
  price: itemPriceSelector(state, id)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  remove: e => dispatch(removeItem(id)),
  updateDescription: e => dispatch(updateItemDescription(id, e.target.value)),
  updateItemBoughtBy: (dudeId, price) => dispatch(updateItemBoughtBy(id, dudeId, price))
})

class Item extends React.Component {
  constructor (props) {
    super(props)

    this.updateItemBoughtByDude = dudeId => {
      this.props.updateItemBoughtBy(dudeId, this.props.price)
    }

    this.updateItemPrice = e => {
      this.props.updateItemBoughtBy(this.props.dudeId, e.target.value)
    }
  }

  render () {
    const {
      description, dudeId, id, price,
      remove, updateDescription
    } = this.props
    return (
      <div style={{ marginBottom: '0.5em' }}>
        <SelectOrAddDude itemId={id} selectedId={dudeId} onChange={this.updateItemBoughtByDude}/>
        <input style={textInputStyle} placeholder="item description" value={description} onChange={updateDescription} />
        <PriceInput onChange={this.updateItemPrice} price={price} />
        <input style={textButtonStyle} type="button" value="remove" onClick={remove} />
        <ItemSharing id={id} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
