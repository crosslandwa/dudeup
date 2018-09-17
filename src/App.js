import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

const App = props => (
  <div style={{
    fontFamily: 'sans-serif'
  }}>
    <span>Your Rollup-React-Redux app goes here!</span>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
