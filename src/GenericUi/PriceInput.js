import React from 'react'
import { textInputStyle } from '../styles'

const PriceInput = ({ onChange, price }) => (
  <input
    style={textInputStyle}
    type="number"
    step="0.01"
    onChange={onChange}
    placeholder="0"
    value={price !== 0 ? price : ''}
  />
)

export default PriceInput
