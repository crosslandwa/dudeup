import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAmountsOwedByDude, selectAmountsOwedToDude } from './selectors'
import { selectSelectedDudeId } from '../dudes/selectors'
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

class SettleUpSummary extends Component {
  render() {
    if (!this.props.selectedDudeId) return null
    return (
      <div className="App-group" style={styles} >
        {(this.props.amountsYouOwe.length === 0) && (this.props.amountsOwedToYou.length === 0) && (
          <div>Dude, you all square!</div>
        )}
        {this.props.amountsYouOwe.map(({dudeName, amount}, index) => (
          <div key={index} >You owe {dudeName || 'someone'} {amount.toFixed(2)}</div>
        ))}
        {this.props.amountsOwedToYou.map(({dudeName, amount}, index) => (
          <div key={index} >{dudeName || 'Someone'} owes you {amount.toFixed(2)}</div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const selectedDudeId = selectSelectedDudeId(state)
  return {
    amountsYouOwe: selectedDudeId
      ? selectAmountsOwedByDude(state, selectedDudeId)
      : [],
    amountsOwedToYou: selectedDudeId
      ? selectAmountsOwedToDude(state, selectedDudeId)
      : [],
    selectedDudeId
  }
}

export default connect(mapStateToProps)(SettleUpSummary)
