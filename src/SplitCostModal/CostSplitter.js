import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { closeModal } from './interactions'
import {
  itemCostSplittingSelector, updateItemCostSplitting,
  itemIsEqualSplitSelector,
  itemDescriptionSelector,
  itemDudeSelector,
  itemPriceSelector
} from '../ItemList/interactions'
import { dudeIdsSelector, dudeNameSelector } from '../DudeList/interactions'
import { textInputStyle } from '../styles'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { itemId }) => ({
  allDudeIds: dudeIdsSelector(state),
  dudeName: apply(dudeId => dudeId ? dudeNameSelector(state, dudeId) : 'some dude', itemDudeSelector(state, itemId)),
  isNonEqualSplit: !itemIsEqualSplitSelector(state, itemId),
  itemDescription: itemDescriptionSelector(state, itemId) || 'a mystery item',
  price: itemPriceSelector(state, itemId),
  costSplitting: itemCostSplittingSelector(state, itemId)
})
const mapDispatchToProps = (dispatch, { itemId }) => ({
  updateItemCostSplitting: costSplit => dispatch(updateItemCostSplitting(itemId, costSplit)),
  closeModal: () => dispatch(closeModal())
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
  <label>
    {props.name}
    <input
      style={textInputStyle}
      type="number"
      step="0.01"
      onChange={props.onChange}
      placeholder="0"
      value={props.price !== 0 ? props.price : ''}
    />
  </label>
))

class CostSplitter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isNonEqualSplit: props.isNonEqualSplit,
      selectedIds: apply(dudeIds => dudeIds.length ? dudeIds : props.allDudeIds, Object.keys(props.costSplitting)),
      individualAmounts: props.costSplitting
    }
    this.updateIndividualAmount = (dudeId, amount) => {
      this.setState((state, props) => ({
        individualAmounts: { ...state.individualAmounts, [dudeId]: amount }
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
        this.setState({ isNonEqualSplit: false })
      }
    }
    this.setNonEqualSplit = e => {
      if (e.target.checked) {
        this.setState({ isNonEqualSplit: true })
      }
    }
    this.submit = () => {
      if (this.state.selectedIds.length) {
        const splitCosts = this.state.isNonEqualSplit
          ? Object.keys(this.state.individualAmounts)
            .map(dudeId => ({ dudeId, amount: this.state.individualAmounts[dudeId] }))
            .filter(({ amount }) => amount > 0)
            .reduce((acc, { dudeId, amount }) => ({ ...acc, [dudeId]: amount }), {})
          : this.state.selectedIds
            .reduce((acc, dudeId) => ({ ...acc, [dudeId]: this.props.price / this.state.selectedIds.length }), {})
        this.props.updateItemCostSplitting(splitCosts)
        this.props.closeModal()
      } else {
        this.setState({ warning: 'Warning - you need to select at least one dude' })
      }
    }
  }

  render () {
    return (
      <Modal onSubmit={this.submit} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {this.state.warning && <span>{this.state.warning}</span>}
          <span>
            Sharing {this.props.price} for <em>{this.props.itemDescription}</em> bought by <em>{this.props.dudeName}</em>
          </span>
          <div>
            <label>
              Split equally between
              <input type="radio" checked={!this.state.isNonEqualSplit} onChange={this.setEqualSplit} />
            </label>
            <label>
              Split unequally between
              <input type="radio" checked={this.state.isNonEqualSplit} onChange={this.setNonEqualSplit} />
            </label>
          </div>
          <div>
            {this.props.allDudeIds.map(id => (
              <div>
                {this.state.isNonEqualSplit
                  ? <AmountInputOption id={id} price={this.state.individualAmounts[id]} onChange={e => this.updateIndividualAmount(id, e.target.value)} />
                  : <CheckBoxOption id={id} selected={this.state.selectedIds.includes(id)} onChange={e => this.toggleDudesInvolvement(id, e.target.checked)}/>
                }
              </div>
            ))}
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CostSplitter)
