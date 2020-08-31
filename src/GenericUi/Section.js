import React from 'react'

const Section = ({ children, dividor = true, title }) => (
  <div class="du-section">
    {title && (
      <h2 class="du-header-text du-header-text--medium">{title}</h2>
    )}
    {dividor && <hr class="du-hr" />}
    <>
      {children}
    </>
  </div>
)

export default Section
