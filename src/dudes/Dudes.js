import React, { Component } from 'react'
import NamesStrip from './NamesStrip'
import GroupSummary from './GroupSummary'

class Dudes extends Component {
  render() {
    return this.props.selectedListId
      ? (
        <div className="App-group">
          <NamesStrip selectedListId={this.props.selectedListId} />
          <GroupSummary />
        </div>
      )
      : null
  }
}

export default Dudes
