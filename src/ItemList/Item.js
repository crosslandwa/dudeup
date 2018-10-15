import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemBoughtByDudeIdSelector, itemPriceSelector, updateItemBoughtBy,
  removeItem
} from './interactions'
import SelectOrAddDude from './SelectOrAddDude'
import ItemSharing from '../ItemSharing'
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
      <div style={{ margin: '0.5em' }}>
        <SelectOrAddDude itemId={id} selectedId={dudeId} onChange={this.updateItemBoughtByDude}/>
        <input style={textInputStyle} placeholder="item description" value={description} onChange={updateDescription} />
        <input style={textInputStyle} type="number" step="0.01" onChange={this.updateItemPrice} placeholder="0" value={price !== 0 ? price : ''} />
        <input style={textButtonStyle} type="button" value="remove" onClick={remove} />
        <ItemSharing id={id} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
