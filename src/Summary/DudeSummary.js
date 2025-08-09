import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from '../DudeList/interactions'

const pick = (balance, negative, zero, postive) => balance === 0 ? zero : balance > 0 ? postive : negative

const mapStateToProps = (state, { id, balance, paymentsDue }) => ({
  credits: paymentsDue.filter(({ to }) => to === id).map(({ from, amount }) => ({
    name: dudeNameSelector(state, from), amount
  })),
  debits: paymentsDue.filter(({ from }) => from === id).map(({ to, amount }) => ({
    name: dudeNameSelector(state, to), amount
  })),
  isSquare: pick(balance, false, true, false),
  name: dudeNameSelector(state, id)
})

const DudeSummary = ({ balance, credits, debits, isSquare, name }) => (
  <>
    {isSquare && (
      <details class="du-details">
        <summary>
          <span>{name} is all square</span>
        </summary>
        <ul class="du-details__list">
          <li>Owes 0.00</li>
          <li>Owed 0.00</li>
        </ul>
      </details>
    )}
    {!isSquare && (
      <details class="du-details">
        <summary>
          <span>{name} {pick(balance, `is owed ${Math.abs(balance).toFixed(2)}`, '', <><strong>owes</strong> {balance.toFixed(2)}</>)}</span>
        </summary>
        <ul class="du-details__list">
          {debits.map(({ name, amount }) => (
            <li>{amount.toFixed(2)} to {name}</li>
          ))}
          {credits.map(({ name, amount }) => (
            <li>{amount.toFixed(2)} from {name}</li>
          ))}
        </ul>
      </details>
    )}
    <hr class="du-hr" />
  </>
)

export default connect(mapStateToProps)(DudeSummary)
