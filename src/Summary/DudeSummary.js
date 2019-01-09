import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from '../DudeList/interactions'
import Dividor from '../GenericUi/Dividor'
import FocusableDiv from '../GenericUi/FocusableDiv'

const pick = (balance, negative, zero, postive) => balance === 0 ? zero : balance > 0 ? postive : negative

const arrowStyle = {
  border: 'solid black',
  borderWidth: '0 2px 2px 0',
  display: 'inline-block',
  padding: '0.125em'
}

const downArrowStyle = { ...arrowStyle, marginRight: '0.2em', marginTop: '-0.5em', transform: 'rotate(45deg)' }
const leftArrowStyle = { ...arrowStyle, transform: 'rotate(135deg)' }

const mapStateToProps = (state, { id, balance, credits, debts, paymentsDue }) => ({
  credits: paymentsDue.filter(({ to }) => to === id).map(({ from, amount }) => ({
    name: dudeNameSelector(state, from), amount
  })),
  debits: paymentsDue.filter(({ from }) => from === id).map(({ to, amount }) => ({
    name: dudeNameSelector(state, to), amount
  })),
  isSquare: pick(balance, false, true, false),
  name: dudeNameSelector(state, id)
})

class DudeSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { openSummary: false }
    this.toggleSummary = () => {
      this.setState((state, props) => ({ openSummary: !state.openSummary }))
    }
  }

  render () {
    const { balance, credits, debits, isSquare, name } = this.props
    return (
      <div>
        {isSquare && (
          <FocusableDiv style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0.5em 0px 1em 0'
          }}>
            <span>{name} is all square</span>
          </FocusableDiv>
        )}
        {!isSquare && (
          <FocusableDiv onClick={this.toggleSummary}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0.5em 0px 1em 0'
            }}>
              <span>{name} {pick(balance, `is owed ${Math.abs(balance).toFixed(2)}`, '', <React.Fragment><strong>owes</strong> {balance.toFixed(2)}</React.Fragment>)}</span>
              <span style={this.state.openSummary ? downArrowStyle : leftArrowStyle} ></span>
            </div>
            {this.state.openSummary && (
              <ul style={{
                fontSize: '85%'
              }}>
                {debits.map(({ name, amount }) => (
                  <li>{amount.toFixed(2)} to {name}</li>
                ))}
                {credits.map(({ name, amount }) => (
                  <li>{amount.toFixed(2)} from {name}</li>
                ))}
              </ul>
            )}
          </FocusableDiv>
        )}
        <Dividor />
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeSummary)
