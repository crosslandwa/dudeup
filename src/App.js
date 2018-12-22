import React from 'react'
import { connect } from 'react-redux'
import Clear from './Clear'
import ItemList from './ItemList'
import Notifications from './Notifications'
import Summary from './Summary'
import AnErrorOccurred from './AnErrorOccurred'
import DudeManagement from './DudeList/Management'
import Section from './Section'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

class App extends React.Component {
  componentWillMount () {
    document.body.style.margin = '0.5em'
  }

  render () {
    return (
      <div style={{
        fontFamily: 'helvetica',
        margin: '0 auto',
        maxWidth: 800
      }}>
        <AnErrorOccurred>
          <Notifications />
          <Section title="Dudes"><DudeManagement /></Section>
          <Section title="Items" spaceAbove={true}><ItemList /></Section>
          <Section title="Dudes, settle up..." spaceAbove={true}><Summary /></Section>
          <Clear />
        </AnErrorOccurred>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
