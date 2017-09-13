import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectItemDescription, selectItemPrice } from './items/selectors'

const style = {
  height: '40px',
  lineHeight: '30px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
}

const priceStyle = {
  width: '10%',
  marginLeft: '3%',
  marginRight: '3%',
  backgroundColor: '#e9ffee',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  cursor: 'pointer',
}

const descriptionStyle = {
  width: '70%',
  textAlign: 'left',
  marginRight: '3%',
  backgroundColor: '#e9ffee',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  cursor: 'pointer',
  padding: '0 4px'
}

class Item extends Component {
  render() {
    return (
      <div style={style} >
        <div style={priceStyle}>{this.props.price}</div>
        {this.props.description
          ? <div style={descriptionStyle}>{this.props.description}</div>
          : <div style={{...descriptionStyle, fontStyle: 'italic'}}>Enter a description...</div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, { id }) => ({
  description: selectItemDescription(state, id),
  price: selectItemPrice(state, id)
})

export default connect(mapStateToProps)(Item)
