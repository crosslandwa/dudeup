import React from 'react'
import { connect } from 'react-redux'
import Clear from './Clear'
import ItemList from './ItemList'
import DudeManagement from './DudeManagement'
import AddDudeModal from './AddDudeModal'
import RemoveDudeModal from './RemoveDudeModal'
import SplitCostModal from './SplitCostModal'
import Summary from './Summary'
import AnErrorOccurred from './AnErrorOccurred'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

const App = props => (
  <div style={{
    fontFamily: 'sans-serif'
  }}>
    <AnErrorOccurred>
      <AddDudeModal />
      <RemoveDudeModal />
      <SplitCostModal />
      <DudeManagement />
      <ItemList />
      <Summary />
      <Clear />
    </AnErrorOccurred>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
