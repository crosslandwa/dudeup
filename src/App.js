import React from 'react'
import { connect } from 'react-redux'
import Clear from './Clear'
import ItemList from './ItemList'
import AddDudeModal from './AddDudeModal'
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
      <ItemList />
      <Summary />
      <Clear />
    </AnErrorOccurred>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
