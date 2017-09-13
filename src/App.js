import React, { Component } from 'react'
import './App.css'
import NamesStrip from './NamesStrip'
import GroupSummary from './GroupSummary'
import ItemList from './ItemList'
import SettleUpSummary from './SettleUpSummary'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <h2>Dude Up</h2>
        </div>
        <div className="App-group">
          <NamesStrip />
          <GroupSummary />
        </div>
        <div className="App-group">
          <ItemList />
        </div>
        <div className="App-group">
          <SettleUpSummary />
        </div>
      </div>
    )
  }
}

export default App
