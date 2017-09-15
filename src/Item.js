import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectItemDescription, selectItemPrice } from './items/selectors'
import { updateItemDescription, updateItemPrice, removeItem } from './items/actions'

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
  backgroundColor: '#e9ffee',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  cursor: 'pointer',
}

const priceStyle = {
  width: '10%',
  marginLeft: '2%',
  marginRight: '2%',
  cursor: 'pointer',
}

const descriptionStyle = {
  width: '70%',
  textAlign: 'left',
  marginRight: '2%',
  padding: '0 4px'
}

const removeButtonStyle = {
  background: 'none',
  border: 'none',
  font: 'inherit',
  cursor: 'pointer',
  marginRight: '2%'
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
        <input style={removeButtonStyle}
          type="button"
          value="remove"
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
