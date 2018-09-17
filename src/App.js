import React from 'react'
import { connect } from 'react-redux'
import DudeList from './DudeList'
import AddDudeButton from './DudeList/AddDudeButton'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

const App = props => (
  <div style={{
    fontFamily: 'sans-serif'
  }}>
    <AddDudeButton />
    <DudeList />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
