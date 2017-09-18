import React, { Component } from 'react'
import NamesStrip from '../NamesStrip'
import GroupSummary from './GroupSummary'

class Dudes extends Component {
  render() {
    return this.props.selectedListId
      ? (
        <div className="App-group">
          <NamesStrip />
          <GroupSummary />
        </div>
      )
      : null
  }
}

export default Dudes
