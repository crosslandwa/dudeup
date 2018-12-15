import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemBoughtByDudeIdSelector, itemPriceSelector, updateItemBoughtBy,
  removeItem
} from './interactions'
import Accordian from '../Accordian'
import DudeList from '../DudeList'
import PriceInput from '../GenericUi/PriceInput'
import { textButtonStyle, textInputStyle } from '../styles'
import { addWarningNotification } from '../Notifications/interactions'

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id),
  dudeId: itemBoughtByDudeIdSelector(state, id),
  price: itemPriceSelector(state, id)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  addWarningNotification: text => dispatch(addWarningNotification(text)),
  remove: e => dispatch(removeItem(id)),
  updateDescription: description => dispatch(updateItemDescription(id, description)),
  updateItemBoughtBy: (dudeId, price) => dispatch(updateItemBoughtBy(id, dudeId, price))
})

class EditItemAccordian extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      description: this.props.description,
      dudeId: this.props.dudeId,
      price: this.props.price
    }

    const store = key => e => this.setState({ [key]: e.target ? e.target.value : e })

    this.storeItemBoughtBy = store('dudeId')
    this.storeItemDescription = store('description')
    this.storeItemPrice = store('price')

    this.updateItem = e => {
      if (!this.state.description) {
        this.props.addWarningNotification('Did not update item - description required')
      } else {
        this.props.updateItemBoughtBy(this.state.dudeId, this.state.price)
        this.props.updateDescription(this.state.description)
        this.props.close()
      }
    }
  }

  render () {
    return (
      <Accordian onCancel={this.props.close} onSubmit={this.updateItem} submitButtonText="Save">
        <input autoFocus style={textInputStyle} placeholder="item description" value={this.state.description} onChange={this.storeItemDescription} />
        <DudeList selectedId={this.state.dudeId} onChange={this.storeItemBoughtBy}/>
        <PriceInput onChange={this.storeItemPrice} price={this.state.price} />
        <div>
          <input style={textButtonStyle} type="button" value="remove" onClick={this.props.remove} />
        </div>
      </Accordian>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemAccordian)
