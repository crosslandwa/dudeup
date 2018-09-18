import React from 'react'
import { connect } from 'react-redux'
import DudeList from './DudeList'
import DudeManagement from './DudeManagement'
import AddDudeModal from './AddDudeModal'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

const App = props => (
  <div style={{
    fontFamily: 'sans-serif'
  }}>
    <AddDudeModal />
    <DudeManagement />
    <DudeList />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
