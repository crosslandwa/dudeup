import React from 'react'
import Clear from '../Clear'
import About from './About'

const Footer = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <About />
    <Clear />
  </div>
)

export default Footer
