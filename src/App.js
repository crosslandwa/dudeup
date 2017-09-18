import React, { Component } from 'react'
import './App.css'
import Dudes from './dudes/Dudes'
import ItemList from './ItemList'
import SettleUpSummary from './SettleUpSummary'
import ChooseList from './lists/ChooseList'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <h2>Dude Up</h2>
          <ChooseList />
        </div>
        <Dudes />
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
