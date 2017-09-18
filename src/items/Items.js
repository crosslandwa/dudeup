import React, { Component } from 'react'
import ItemList from '../ItemList'

class Items extends Component {
  render() {
    return this.props.selectedDudeId
      ? (
        <div className="App-group">
          <ItemList />
        </div>
      )
      : null
  }
}

export default Items
