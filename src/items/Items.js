import React, { Component } from 'react'
import ItemList from '../ItemList'

class Items extends Component {
  render() {
    return this.props.selectedDudeId
      ? <ItemList />
      : null
  }
}

export default Items
