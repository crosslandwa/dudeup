import React, { Component } from 'react'
import NamesStrip from './NamesStrip'
import GroupSummary from './GroupSummary'
import { overcast } from '../colours'

const styles = {
  borderRadius: 5,
  backgroundColor: overcast,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

class Dudes extends Component {
  render() {
    return this.props.selectedListId
      ? (
        <div style={styles} className="App-group">
          <NamesStrip selectedListId={this.props.selectedListId} />
          <GroupSummary />
        </div>
      )
      : null
  }
}

export default Dudes
