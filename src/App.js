import React from 'react'
import { connect } from 'react-redux'
import Footer from './Footer'
import ItemList from './ItemList'
import Notifications from './Notifications'
import Summary from './Summary'
import AnErrorOccurred from './AnErrorOccurred'
import DudeManagement from './DudeList/Management'
import Section from './GenericUi/Section'

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
        fontSize: '0.875em',
        margin: '0 auto',
        maxWidth: 800
      }}>
        <AnErrorOccurred>
          <Notifications />
          <Section title="Dudes"><DudeManagement /></Section>
          <Section title="Items" spaceAbove={true}><ItemList /></Section>
          <Section title="Dudes, settle up..." spaceAbove={true}><Summary /></Section>
          <Section dividor={false} spaceAbove={true}><Footer /></Section>
        </AnErrorOccurred>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
