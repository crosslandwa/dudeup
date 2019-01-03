import React from 'react'
import { connect } from 'react-redux'
import {
  addItem,
  updateItem,
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector, itemPriceSelector,
  removeItem
} from './interactions'
import Accordian from '../Accordian'
import DudeList from '../DudeList'
import PriceInput from '../GenericUi/PriceInput'
import { textButtonStyle, textInputStyle } from '../styles'
import { addWarningNotification } from '../Notifications/interactions'
import ItemSharing from './ItemSharing'

const mapStateToProps = (state, { id }) => ({
  description: id ? itemDescriptionSelector(state, id) : undefined,
  dudeId: id ? itemBoughtByDudeIdSelector(state, id) : undefined,
  price: id ? itemPriceSelector(state, id) : undefined
})

const mapDispatchToProps = (dispatch, { id }) => ({
  addItem: (description, dudeId, price) => dispatch(addItem(description, dudeId, price)),
  addWarningNotification: text => dispatch(addWarningNotification(text)),
  remove: e => dispatch(removeItem(id)),
  updateItem: (description, dudeId, price) => dispatch(updateItem(id, description, dudeId, price))
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

    this.setItemSharing = node => {
      if (node) {
        this.itemSharing = node.getWrappedInstance()
      }
    }

    this.storeItemBoughtBy = store('dudeId')
    this.storeItemDescription = store('description')
    this.storeItemPrice = store('price')

    this.remove = () => {
      this.props.remove()
      this.props.close()
    }

    this.updateItem = e => {
      if (!this.state.description) {
        this.props.addWarningNotification(`Did not ${this.props.id ? 'update' : 'add'} item - description required`)
      } else if (this.props.id) {
        this.props.updateItem(this.state.description, this.state.dudeId, this.state.price)
        this.itemSharing && this.itemSharing.submit()
        this.props.close()
      } else {
        this.props.addItem(this.state.description, this.state.dudeId, this.state.price)
        this.props.close()
      }
    }
  }

  render () {
    return (
      <Accordian onCancel={this.props.close} onSubmit={this.updateItem} title={this.props.id ? 'Update item' : 'Add item'} >
        <input style={{
            ...textInputStyle,
            boxSizing: 'border-box',
            width: '100%'
          }}
          autoFocus
          placeholder="item description"
          value={this.state.description}
          onChange={this.storeItemDescription}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          margin: '0 -0.5em'
        }}>
          <PriceInput style={{ flexGrow: 1, margin: '0.5em 0.5em 0 0.5em' }} onChange={this.storeItemPrice} price={this.state.price} />
          <DudeList style={{ flexGrow: 1, margin: '0.5em 0.5em 0 0.5em' }} selectedId={this.state.dudeId} onChange={this.storeItemBoughtBy}/>
        </div>
        {this.props.id && <ItemSharing ref={this.setItemSharing} itemId={this.props.id} price={this.state.price} />}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5em' }}>
          <input style={textButtonStyle} type="submit" value={this.props.id ? 'Update' : 'Add'} />
          {this.props.id && (
            <input
              type="button"
              style={textButtonStyle}
              onClick={this.remove}
              value="Remove"
            />
          )}
        </div>
      </Accordian>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemAccordian)
