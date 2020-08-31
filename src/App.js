import React from 'react'
import ItemList from './ItemList'
import Notifications from './Notifications'
import Summary from './Summary'
import AnErrorOccurred from './AnErrorOccurred'
import DudeManagement from './DudeList/Management'
import Section from './GenericUi/Section'
import Header from './Header'
import './app.css'

const App = () => (
  <>
    <Header />
    <AnErrorOccurred>
      <Notifications />
      <Section title="Dudes"><DudeManagement /></Section>
      <Section title="Items"><ItemList /></Section>
      <Section title="Settle up..."><Summary /></Section>
    </AnErrorOccurred>
  </>
)

export default App
