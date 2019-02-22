import React from 'react'
import { highlightColor } from '../styles'

const Header = props => (
  <header style={{
    fontFamily: 'helvetica',
    backgroundColor: highlightColor,
    boxShadow: `0 0 2em 1.5em ${highlightColor}`,
    margin: '0 auto'
  }}>
    <div style={{
      padding: '0.25em',
      textAlign: 'center'
    }}>
      <h1 style={{ margin: 0 }}>DUDE UP</h1>
    </div>
  </header>
)

export default Header
