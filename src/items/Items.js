import React, { Component } from 'react'
import ItemList from './ItemList'

class Items extends Component {
  render() {
    return this.props.selectedDudeId
      ? <ItemList selectedDudeId={this.props.selectedDudeId} />
      : null //'Select a dude above to see/edit what they paid for...'
  }
}

export default Items
