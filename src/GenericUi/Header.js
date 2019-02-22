import React from 'react'
import { highlightColor } from '../styles'

const Header = props => (
  <header style={{
    fontFamily: 'helvetica',
    fontSize: '1em',
    boxShadow: `0 0 1em 0.5em ${highlightColor}`,
    maxWidth: 800,
    margin: '0.5em auto 0 auto'
  }}>
    <div style={{
      margin: '0 auto',
      maxWidth: 800,
      border: '1px solid #808080',
      padding: '0.25em',
      textAlign: 'center'
    }}>
      <h1 style={{ margin: 0 }}>DUDE UP</h1>
    </div>
  </header>
)

export default Header
