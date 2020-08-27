import React from 'react'
import { connect } from 'react-redux'
import {
  addItem,
  updateItem,
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector,
  itemPriceSelector,
  itemSharedByDudesSelector,
  removeItem
} from './interactions'
import Accordian from '../Accordian'
import DudeList from '../DudeList'
import PriceInput from '../GenericUi/PriceInput'
import { textInputStyle } from '../styles'
import { addWarningNotification } from '../Notifications/interactions'
import ItemSharing from './ItemSharing'

const mapStateToProps = (state, { id }) => ({
  description: id ? itemDescriptionSelector(state, id) : undefined,
  dudeId: id ? itemBoughtByDudeIdSelector(state, id) : undefined,
  sharedByDudes: id ? itemSharedByDudesSelector(state, id) : [],
  price: id ? itemPriceSelector(state, id) : undefined
})

const mapDispatchToProps = (dispatch, { id }) => ({
  addItem: (...args) => dispatch(addItem(...args)),
  addWarningNotification: text => dispatch(addWarningNotification(text)),
  remove: e => dispatch(removeItem(id)),
  updateItem: (...args) => dispatch(updateItem(id, ...args))
})

const hasExplicitSharingAmounts = sharedByDudes => sharedByDudes.some(({ amount }) => !!amount)

const amountLeft = (price = 0, sharedByDudes) => {
  return hasExplicitSharingAmounts(sharedByDudes)
    ? price - sharedByDudes
      .map(({ amount = 0 }) => amount)
      .reduce((a, b) => a + b, 0)
    : 0
}

class EditItemAccordian extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      amountLeft: amountLeft(this.props.price, props.sharedByDudes),
      description: props.description,
      dudeId: props.dudeId,
      price: props.price,
      sharedByDudes: props.sharedByDudes
    }

    const store = key => e => this.setState({ [key]: e.target ? e.target.value : e })

    this.storeItemBoughtBy = store('dudeId')
    this.storeItemDescription = store('description')

    this.storeItemPrice = e => {
      const price = e.target.value
      this.setState((state) => ({ price, amountLeft: amountLeft(price, state.sharedByDudes) }))
    }

    this.remove = () => {
      this.props.remove()
    }

    this.shareByEveryone = () => {
      this.setState({ sharedByDudes: [], amountLeft: 0 })
    }

    this.toggleDudesInvolvement = (dudeId, checked) => {
      this.setState((state) => {
        const newSharedByDudes = checked
          ? state.sharedByDudes.concat(hasExplicitSharingAmounts(state.sharedByDudes)
            ? { dudeId, amount: 0 }
            : { dudeId }
          )
          : state.sharedByDudes.filter(({ dudeId: sharedByDudeId }) => sharedByDudeId !== dudeId)
        const newAmountLeft = amountLeft(state.price, newSharedByDudes)
        return {
          amountLeft: newAmountLeft,
          sharedByDudes: newSharedByDudes
        }
      })
    }

    this.updateItem = e => {
      const { amountLeft, description, dudeId, price, sharedByDudes } = this.state
      if (!this.state.description) {
        this.props.addWarningNotification(`Did not ${this.props.id ? 'update' : 'add'} item - description required`)
      } else if (amountLeft !== 0) {
        this.props.addWarningNotification("Dude that doesn't add up! - the individual amounts don't add up to the item total")
      } else {
        const updateOrAdd = this.props.id ? this.props.updateItem : this.props.addItem
        updateOrAdd(description, dudeId, price, sharedByDudes)
        this.props.onClose()
      }
    }

    this.updateIndividualAmount = (dudeId, amount) => {
      this.setState((state) => {
        const newSharedByDudes = state.sharedByDudes.map(({ dudeId: sharedByDudeId, amount: oldAmount = 0 }) => ({
          dudeId: sharedByDudeId,
          amount: sharedByDudeId === dudeId ? parseFloat(amount || 0) : oldAmount
        }))
        return {
          sharedByDudes: newSharedByDudes,
          amountLeft: amountLeft(state.price, newSharedByDudes)
        }
      })
    }
  }

  render () {
    const { id, onClose } = this.props
    const { amountLeft, description, dudeId, price, sharedByDudes } = this.state
    return (
      <Accordian onClose={onClose} onSubmit={this.updateItem} title={id ? 'Update item' : 'Add item'} >
        <input
          style={{
            ...textInputStyle,
            boxSizing: 'border-box',
            width: '100%'
          }}
          autoFocus
          placeholder="item description"
          value={description}
          onChange={this.storeItemDescription}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          margin: '0 -0.5em'
        }}>
          <PriceInput style={{ flexGrow: 1, margin: '0.5em 0.5em 0 0.5em' }} onChange={this.storeItemPrice} price={price} />
          <DudeList style={{ maxWidth: 'calc(100% - 1em)', flexGrow: 1, margin: '0.5em 0.5em 0 0.5em' }} selectedId={dudeId} onChange={this.storeItemBoughtBy}/>
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
            sharedByDudes={sharedByDudes}
            shareByEveryone={this.shareByEveryone}
            toggleDudesInvolvement={this.toggleDudesInvolvement}
            amountLeft={amountLeft}
            updateIndividualAmount={this.updateIndividualAmount}
            hasExplicitSharingAmounts={hasExplicitSharingAmounts(sharedByDudes)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5em' }}>
          <button class="du-button du-button--submit" type="submit">{id ? 'Update' : 'Add'}</button>
          {id && (
            <button class="du-button du-button--delete" onClick={this.remove} type="button">Remove</button>
          )}
        </div>
      </Accordian>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemAccordian)
