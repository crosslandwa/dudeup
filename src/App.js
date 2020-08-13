import React from 'react'
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

const App = () => (
  <>
    <Header />
    <div class="du-content-container">
      <About />
      <AnErrorOccurred>
        <Notifications />
        <Section title="Dudes"><DudeManagement /></Section>
        <Section title="Items"><ItemList /></Section>
        <Section title="Settle up..."><Summary /></Section>
        <Clear />
      </AnErrorOccurred>
    </div>
  </>
)

export default App
