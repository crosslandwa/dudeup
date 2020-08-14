import React from 'react'
import About from './About'
import Clear from './Clear'

const Header = props => (
  <header class="du-full-width-container__outer du-header">
    <div class="du-full-width-container__inner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <h1 style={{ display: 'inline-block', margin: '0 0.25em 0 0' }}>DUDE UP</h1>
      <div style={{ margin: '0.5em 0.5em 0 0' }}>
        <About />
      </div>
      <div style={{ margin: '0.5em 0.5em 0 0' }}>
        <Clear />
      </div>
    </div>
  </header>
)

export default Header
