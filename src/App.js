import React from 'react'
import { connect } from 'react-redux'
import Clear from './Clear'
import ItemList from './ItemList'
import DudeManagement from './DudeManagement'
import AddDudeModal from './AddDudeModal'
import RemoveDudeModal from './RemoveDudeModal'
import Summary from './Summary'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

const App = props => (
  <div style={{
    fontFamily: 'sans-serif'
  }}>
    <AddDudeModal />
    <RemoveDudeModal />
    <DudeManagement />
    <ItemList />
    <Summary />
    <Clear />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
