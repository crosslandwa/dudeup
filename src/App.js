import React from 'react'
import { connect } from 'react-redux'
import ItemList from './ItemList'
import Notifications from './Notifications'
import Summary from './Summary'
import AnErrorOccurred from './AnErrorOccurred'
import DudeManagement from './DudeList/Management'
import Section from './GenericUi/Section'
import Header from './GenericUI/Header'
import About from './About'
import Clear from './Clear'
import './app.css'

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

class App extends React.Component {
  componentWillMount () {
    document.body.style.margin = 0
  }

  render () {
    return (
      <React.Fragment>
        <Header />
        <div style={{
          fontFamily: 'helvetica',
          fontSize: '1em',
          margin: '0 auto',
          maxWidth: 800
        }}>
          <div style={{ margin: '0 0.75em' }}>
            <AnErrorOccurred>
              <Notifications />
              <About />
              <Section title="Dudes"><DudeManagement /></Section>
              <Section title="Items"><ItemList /></Section>
              <Section title="Settle up..."><Summary /></Section>
              <Clear />
            </AnErrorOccurred>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
