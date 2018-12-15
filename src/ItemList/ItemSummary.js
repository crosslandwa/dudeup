import React from 'react'
import { connect } from 'react-redux'
import {
  itemDescriptionSelector, updateItemDescription,
  itemBoughtByDudeIdSelector, itemPriceSelector, updateItemBoughtBy
} from './interactions'
import { dudeNameSelector } from '../DudeList/interactions'
import EditItemAccordian from './EditItemAccordian'
import ItemSharing from '../ItemSharing'
import { textButtonStyle } from '../styles'

const apply = (f, x) => f(x)

const mapStateToProps = (state, { id }) => ({
  description: itemDescriptionSelector(state, id) || 'no description',
  dude: apply(
    dudeId => dudeId ? dudeNameSelector(state, dudeId) : 'no buyer selected',
    itemBoughtByDudeIdSelector(state, id)
  ),
  price: itemPriceSelector(state, id)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  updateDescription: e => dispatch(updateItemDescription(id, e.target.value)),
  updateItemBoughtBy: (dudeId, price) => dispatch(updateItemBoughtBy(id, dudeId, price))
})

class ItemSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { edit: false }

    this.toggleEdit = e => {
      this.setState(state => ({ edit: !state.edit }))
    }

    this.closeEdit = e => {
      this.setState({ edit: false })
    }
  }

  render () {
    const { description, dude, id, price } = this.props
    return (
      <div style={{ ...textButtonStyle, marginBottom: '0.5em' }}>
        {this.state.edit
          ? (
            <EditItemAccordian id={id} close={this.closeEdit} />
          ) : (
            <div style={{ cursor: 'pointer' }} onClick={this.toggleEdit}>
              <span>{description}</span>
              <span> - </span>
              <span>{dude}</span>
              <span> - </span>
              <span>{price}</span>
            </div>
          )}
        <ItemSharing id={id} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSummary)
