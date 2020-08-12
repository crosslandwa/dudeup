import React from 'react'

const Section = ({ children, dividor = true, title }) => (
  <div class="du-section">
    {title && (
      <h2 style={{
        margin: 0,
        fontSize: '1.25em'
      }}>{title}</h2>
    )}
    {dividor && <hr class="du-hr" />}
    <>
      {children}
    </>
  </div>
)

export default Section
