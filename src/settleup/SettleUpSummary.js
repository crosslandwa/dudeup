import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAmountsOwedByDude, selectAmountsOwedToDude } from './selectors'
import { overcast } from '../colours'

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
    return this.props.selectedDudeId
      ? (
        <div className="App-group" style={styles} >
          <div style={listStyle}>
            {(this.props.amountsYouOwe.length === 0) && (
              <div>You don't owe anything!</div>
            )}
            {this.props.amountsYouOwe.map(({dudeName, amount}, index) => (
              <div key={index} >You owe {dudeName || 'someone'} {amount.toFixed(2)}</div>
            ))}
            <div style={listStyle}>
              {(this.props.amountsOwedToYou.length === 0) && (
                <div>You aren't owed anything...</div>
              )}
              {this.props.amountsOwedToYou.map(({dudeName, amount}, index) => (
                <div key={index} >{dudeName || 'Someone'} owes you {amount.toFixed(2)}</div>
              ))}
            </div>
          </div>
        </div>
      )
      : null
  }
}

const mapStateToProps = (state, { selectedDudeId }) => ({
  amountsYouOwe: selectedDudeId
    ? selectAmountsOwedByDude(state, selectedDudeId)
    : [],
  amountsOwedToYou: selectedDudeId
    ? selectAmountsOwedToDude(state, selectedDudeId)
    : [],
})

export default connect(mapStateToProps)(SettleUpSummary)
