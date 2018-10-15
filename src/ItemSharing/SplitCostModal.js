import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {
  itemCostSplitSelector, itemSharedByDudeIdsSelector, shareItemBetweenDudes, splitItemBetweenDudes,
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector,
  itemPriceSelector,
  isItemExplicitlySplitSelector
} from '../ItemList/interactions'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import PriceInput from '../GenericUi/PriceInput'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { itemId }) => ({
  allDudeIds: dudeIdsSelector(state),
  dudeName: apply(
    dudeId => dudeId ? dudeNameSelector(state, dudeId) : 'some dude',
    itemBoughtByDudeIdSelector(state, itemId)
  ),
  isEqualSplit: !isItemExplicitlySplitSelector(state, itemId),
  itemDescription: itemDescriptionSelector(state, itemId) || 'a mystery item',
  itemSharedByDudeIds: itemSharedByDudeIdsSelector(state, itemId),
  price: itemPriceSelector(state, itemId),
  costSplitting: itemCostSplitSelector(state, itemId)
})

const mapDudeIdToName = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

const CheckBoxOption = connect(mapDudeIdToName)(props => (
  <label>
    {props.name}
    <input
      type="checkbox"
      value={props.id}
      checked={props.selected}
      onChange={props.onChange}
    />
  </label>
))

const AmountInputOption = connect(mapDudeIdToName)(props => (
  <label>{props.name}<PriceInput {...props} /></label>
))

class SplitCostModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEqualSplit: props.isEqualSplit,
      selectedIds: props.itemSharedByDudeIds.length ? props.itemSharedByDudeIds : props.allDudeIds,
      individualAmounts: props.costSplitting
    }
    this.updateIndividualAmount = (dudeId, amount) => {
      this.setState((state, props) => ({
        individualAmounts: { ...state.individualAmounts, [dudeId]: parseFloat(amount || 0) }
      }))
    }
    this.toggleDudesInvolvement = (dudeId, checked) => {
      this.setState((state, props) => ({
        selectedIds: checked
          ? [...new Set(state.selectedIds.concat(dudeId))]
          : state.selectedIds.filter(id => id !== dudeId)
      }))
    }
    this.setEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isEqualSplit: true })
      }
    }
    this.setNonEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isEqualSplit: false })
      }
    }
    this.submit = () => {
      if (this.state.selectedIds.length) {
        if (this.state.isEqualSplit) {
          this.props.shareItemBetweenDudes(this.props.itemId, this.state.selectedIds)
        } else {
          this.props.splitItemBetweenDudes(
            this.props.itemId,
            Object.keys(this.state.individualAmounts)
              .map(dudeId => ({ dudeId, amount: this.state.individualAmounts[dudeId] }))
              .filter(({ amount }) => amount > 0)
              .reduce((acc, { dudeId, amount }) => ({ ...acc, [dudeId]: amount }), {})
          )
        }
        this.props.closeModal()
      } else {
        this.setState({ warning: 'Warning - you need to select at least one dude' })
      }
    }
    this.splitTotal = () => Object.keys(this.state.individualAmounts)
      .map(dudeId => this.state.individualAmounts[dudeId])
      .filter(x => x)
      .reduce((a, b) => a + b, 0)
  }

  render () {
    const { allDudeIds, closeModal, dudeName, itemDescription, price } = this.props
    return (
      <Modal onCancel={closeModal} onSubmit={this.submit} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {this.state.warning && <span>{this.state.warning}</span>}
          <span>
            <strong>{itemDescription}</strong>  - bought by <em>{dudeName}</em> for {price}
          </span>
          <div>
            <label>
              Shared by
              <input autoFocus={this.state.isEqualSplit} type="radio" checked={this.state.isEqualSplit} onChange={this.setEqualSplit} />
            </label>
            <label>
              Split between
              <input autoFocus={!this.state.isEqualSplit} type="radio" checked={!this.state.isEqualSplit} onChange={this.setNonEqualSplit} />
            </label>
          </div>
          <div>
            {allDudeIds.map(id => (
              <div>
                {this.state.isEqualSplit
                  ? <CheckBoxOption id={id} selected={this.state.selectedIds.includes(id)} onChange={e => this.toggleDudesInvolvement(id, e.target.checked)}/>
                  : <AmountInputOption id={id} price={this.state.individualAmounts[id]} onChange={e => this.updateIndividualAmount(id, e.target.value)} />
                }
              </div>
            ))}
            {!this.state.isEqualSplit && (
              <div>You have {price - this.splitTotal()} left to divvy up</div>
            )}
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, { shareItemBetweenDudes, splitItemBetweenDudes })(SplitCostModal)
