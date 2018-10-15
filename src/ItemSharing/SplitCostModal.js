import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {
  itemCostSplittingSelector, updateItemCostSplitting,
  itemIsEqualSplitSelector,
  itemDescriptionSelector,
  itemBoughtByDudeIdSelector,
  itemPriceSelector
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
  isEqualSplit: itemIsEqualSplitSelector(state, itemId),
  itemDescription: itemDescriptionSelector(state, itemId) || 'a mystery item',
  price: itemPriceSelector(state, itemId),
  costSplitting: itemCostSplittingSelector(state, itemId)
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
        const splitCosts = this.state.isEqualSplit
          ? this.state.selectedIds
            .reduce((acc, dudeId) => ({ ...acc, [dudeId]: this.props.price / this.state.selectedIds.length }), {})
          : Object.keys(this.state.individualAmounts)
            .map(dudeId => ({ dudeId, amount: this.state.individualAmounts[dudeId] }))
            .filter(({ amount }) => amount > 0)
            .reduce((acc, { dudeId, amount }) => ({ ...acc, [dudeId]: amount }), {})
        this.props.updateItemCostSplitting(this.props.itemId, splitCosts)
        this.props.closeModal()
      } else {
        this.setState({ warning: 'Warning - you need to select at least one dude' })
      }
    }
  }

  render () {
    return (
      <Modal onCancel={this.props.closeModal} onSubmit={this.submit} >
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {this.state.warning && <span>{this.state.warning}</span>}
          <span>
            <strong>{this.props.itemDescription}</strong>  - bought by <em>{this.props.dudeName}</em> for {this.props.price}
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
            {this.props.allDudeIds.map(id => (
              <div>
                {this.state.isEqualSplit
                  ? <CheckBoxOption id={id} selected={this.state.selectedIds.includes(id)} onChange={e => this.toggleDudesInvolvement(id, e.target.checked)}/>
                  : <AmountInputOption id={id} price={this.state.individualAmounts[id]} onChange={e => this.updateIndividualAmount(id, e.target.value)} />
                }
              </div>
            ))}
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, { updateItemCostSplitting })(SplitCostModal)
