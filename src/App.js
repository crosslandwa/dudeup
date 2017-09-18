import React, { Component } from 'react'
import './App.css'
import Dudes from './dudes/Dudes'
import SelectedDudeContainer from './dudes/SelectedDudeContainer'
import SelectedListContainer from './lists/SelectedListContainer'
import Items from './items/Items'
import SettleUpSummary from './settleup/SettleUpSummary'
import ChooseList from './lists/ChooseList'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <h2 style={{marginBottom: 0}}>Dude Up</h2>
          <ChooseList />
        </div>
        <SelectedListContainer>
          <Dudes />
          <SelectedDudeContainer>
            <Items />
            <SettleUpSummary />
          </SelectedDudeContainer>
        </SelectedListContainer>
      </div>
    )
  }
}

export default App
