import React from 'react'
import { connect } from 'react-redux'
import {
  addItem,
  updateItem,
  itemCostSplitSelector,
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector, itemPriceSelector,
  itemSharedByDudeIdsSelector,
  removeItem
} from './interactions'
import Accordian from '../Accordian'
import DudeList from '../DudeList'
import PriceInput from '../GenericUi/PriceInput'
import { textInputStyle } from '../styles'
import { addWarningNotification } from '../Notifications/interactions'
import ItemSharing from './ItemSharing'

const mapStateToProps = (state, { id }) => ({
  costSplitting: id ? itemCostSplitSelector(state, id) : {},
  description: id ? itemDescriptionSelector(state, id) : undefined,
  dudeId: id ? itemBoughtByDudeIdSelector(state, id) : undefined,
  itemSharedByDudeIds: id ? itemSharedByDudeIdsSelector(state, id) : [],
  price: id ? itemPriceSelector(state, id) : undefined
})

const mapDispatchToProps = (dispatch, { id }) => ({
  addItem: (...args) => dispatch(addItem(...args)),
  addWarningNotification: text => dispatch(addWarningNotification(text)),
  remove: e => dispatch(removeItem(id)),
  updateItem: (...args) => dispatch(updateItem(id, ...args))
})

const amountLeft = (price = 0, individualAmounts) => {
  if (!Object.keys(individualAmounts).filter(id => !!individualAmounts[id]).length) {
    return 0
  }
  return price - Object.keys(individualAmounts)
    .map(dudeId => individualAmounts[dudeId])
    .filter(x => x)
    .reduce((a, b) => a + b, 0)
}

class EditItemAccordian extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      amountLeft: amountLeft(this.props.price, props.costSplitting),
      description: props.description,
      dudeId: props.dudeId,
      individualAmounts: props.costSplitting,
      price: props.price,
      selectedIds: props.itemSharedByDudeIds
    }

    const store = key => e => this.setState({ [key]: e.target ? e.target.value : e })

    this.storeItemBoughtBy = store('dudeId')
    this.storeItemDescription = store('description')

    this.storeItemPrice = e => {
      const price = e.target.value
      this.setState((state, props) => ({ price, amountLeft: amountLeft(price, state.individualAmounts) }))
    }

    this.remove = () => {
      this.props.remove()
    }

    this.shareByEveryone = () => {
      this.setState({ selectedIds: [], individualAmounts: {}, amountLeft: 0 })
    }

    this.toggleDudesInvolvement = (dudeId, checked) => {
      this.setState((state) => {
        const individualAmounts = { ...state.individualAmounts, [dudeId]: 0 }
        const newAmountLeft = amountLeft(this.state.price, individualAmounts)
        return {
          amountLeft: newAmountLeft,
          individualAmounts,
          selectedIds: checked
            ? [...new Set(state.selectedIds.concat(dudeId))]
            : state.selectedIds.filter(id => id !== dudeId)
        }
      })
    }

    this.updateItem = e => {
      const { amountLeft, description, dudeId, price, selectedIds, individualAmounts } = this.state
      if (!this.state.description) {
        this.props.addWarningNotification(`Did not ${this.props.id ? 'update' : 'add'} item - description required`)
      } else if (amountLeft !== 0) {
        this.props.addWarningNotification("Dude that doesn't add up! - the individual amounts don't add up to the item total")
      } else {
        const updateOrAdd = this.props.id ? this.props.updateItem : this.props.addItem
        const updatedCostSplitDetails = Object.keys(individualAmounts).length ? individualAmounts : selectedIds
        updateOrAdd(description, dudeId, price, updatedCostSplitDetails)
        this.props.onClose()
      }
    }

    this.updateIndividualAmount = (dudeId, amount) => {
      this.setState((state) => {
        const individualAmounts = { ...state.individualAmounts, [dudeId]: parseFloat(amount || 0) }
        return {
          selectedIds: [...new Set(state.selectedIds.concat(dudeId))],
          individualAmounts,
          amountLeft: amountLeft(state.price, individualAmounts)
        }
      })
    }
  }

  render () {
    const { onClose } = this.props
    const { price } = this.state
    return (
      <Accordian onClose={onClose} onSubmit={this.updateItem} title={this.props.id ? 'Update item' : 'Add item'} >
        <input
          style={{
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
          <PriceInput style={{ flexGrow: 1, margin: '0.5em 0.5em 0 0.5em' }} onChange={this.storeItemPrice} price={price} />
          <DudeList style={{ maxWidth: 'calc(100% - 1em)', flexGrow: 1, margin: '0.5em 0.5em 0 0.5em' }} selectedId={this.state.dudeId} onChange={this.storeItemBoughtBy}/>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '0.5em',
          lineHeight: '2em'
        }}>
          <div>Split between</div>
          <ItemSharing
            price={price}
            selectedIds={this.state.selectedIds}
            shareByEveryone={this.shareByEveryone}
            toggleDudesInvolvement={this.toggleDudesInvolvement}
            amountLeft={this.state.amountLeft}
            individualAmounts={this.state.individualAmounts}
            updateIndividualAmount={this.updateIndividualAmount}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5em' }}>
          <button class="du-button du-button--submit" type="submit">{this.props.id ? 'Update' : 'Add'}</button>
          {this.props.id && (
            <button class="du-button du-button--delete" onClick={this.remove} type="button">Remove</button>
          )}
        </div>
      </Accordian>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemAccordian)
