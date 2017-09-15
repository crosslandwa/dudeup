import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSelectedDudeId } from './dudes/selectors'
import { selectAmountsOwedByDude, selectAmountsOwedToDude } from './settleup/selectors'
import { overcast } from './colours'

const styles = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: 5,
  backgroundColor: overcast,
  alignItems: 'center',
  lineHeight: '26px',
  minHeight: 30
}

const listStyle = {
  marginTop: '5px',
  marginBottom: '5px'
}

class SettleUpSummary extends Component {
  render() {
    return (
      <div style={styles} >
        {this.props.dudeId ? '' : '... and how to settle up with the other dudes'}
        {this.props.dudeId && (
          <div style={listStyle}>
            {(this.props.amountsYouOwe.length === 0) && (
              <div>You don't owe anything!</div>
            )}
            {this.props.amountsYouOwe.map(({dudeName, amount}, index) => (
              <div key={index} >You owe {dudeName} {amount}</div>
            ))}
          </div>
        )}
        {this.props.dudeId && (
          <div style={listStyle}>
            {(this.props.amountsOwedToYou.length === 0) && (
              <div>You aren't owed anything...</div>
            )}
            {this.props.amountsOwedToYou.map(({dudeName, amount}, index) => (
              <div key={index} >{dudeName} owes you {amount}</div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  dudeId: selectSelectedDudeId(state),
  amountsYouOwe: selectSelectedDudeId(state)
    ? selectAmountsOwedByDude(state, selectSelectedDudeId(state))
    : [],
  amountsOwedToYou: selectSelectedDudeId(state)
    ? selectAmountsOwedToDude(state, selectSelectedDudeId(state))
    : [],
})

export default connect(mapStateToProps)(SettleUpSummary)
