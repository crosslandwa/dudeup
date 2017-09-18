import React, { Component } from 'react'
import NamesStrip from '../NamesStrip'
import GroupSummary from '../GroupSummary'

class Dudes extends Component {
  render() {
    return (
      <div className="App-group">
        <NamesStrip />
        <GroupSummary />
      </div>
    )
  }
}

export default Dudes
