import React, { Component } from 'react'
import './App.css'
import Dudes from './dudes/Dudes'
import SelectedDudeContainer from './dudes/SelectedDudeContainer'
import SelectedListContainer from './lists/SelectedListContainer'
import Items from './items/Items'
import SettleUpSummary from './settleup/SettleUpSummary'
import ListsSection from './lists/ListsSection'
import Removals from './Removals'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <h2 style={{marginBottom: 0}}>Dude Up</h2>
          <ListsSection />
        </div>
        <SelectedListContainer>
          <Dudes />
          <SelectedDudeContainer>
            <Items />
            <SettleUpSummary />
            <Removals />
          </SelectedDudeContainer>
        </SelectedListContainer>
        <div className="App-group" style={{ textAlign: 'left' }}>
          <p>
            Square up shared expenses between a bunch of dudes. Split the cost of last night's several rounds of drinks, the wild holiday kitty, communal bills in a shared home, etc. Simply:
          </p>
          <ul>
            <li>Create a new list</li>
            <li>Add one or more dudes to the list</li>
            <li>Add the items (and price) each dude paid for</li>
          </ul>
          <p>
            Dude Up will work some magic and tell each dude what they owe the others, and/or what the others owe them, ensuring everyone has paid the same overall. Marvellous!
          </p>
        </div>
      </div>
    )
  }
}

export default App
