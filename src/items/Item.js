import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectItemDescription, selectItemPrice } from './selectors'
import { updateItemDescription, updateItemPrice, removeItem } from './actions'
import { paper } from '../colours'
import ClickableButton from '../dumbui/ClickableButton'

const style = {
  height: '40px',
  lineHeight: '30px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
}

const inputStyle = {
  height: '30px',
  fontFamily: 'sans-serif',
  fontSize: 'inherit',
  backgroundColor: paper,
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  cursor: 'pointer',
}

const priceStyle = {
  width: '12%',
  marginLeft: '1%',
  marginRight: '1%',
  padding: '0 1%'
}

const descriptionStyle = {
  width: '70%',
  textAlign: 'left',
  marginRight: '1%',
  padding: '0 4px'
}

const removeButtonStyle = {
  marginRight: '1%',
  padding: '0 1%'
}

class Item extends Component {
  render() {
    return (
      <div style={style} >
        <input
          style={{...inputStyle, ...priceStyle}}
          type="number"
          value={this.props.price !== 0 ? this.props.price : ''}
          step=".01"
          placeholder="0"
          onChange={this.props.updatePrice}
        />
        <input
          style={{...inputStyle, ...descriptionStyle}}
          type="text" value={this.props.description}
          onChange={this.props.updateDescription}
          placeholder="Enter a description..."
        />
        <ClickableButton
          style={removeButtonStyle}
          value="Delete"
          onClick={this.props.removeItem}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, { id }) => ({
  description: selectItemDescription(state, id),
  price: selectItemPrice(state, id)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  updateDescription: (event) => dispatch(updateItemDescription(id, event.target.value)),
  updatePrice: (event) => dispatch(updateItemPrice(id, event.target.value)),
  removeItem: () => dispatch(removeItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
