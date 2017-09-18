import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSelectedDudeId, selectDudesName } from './dudes/selectors'
import { removeDude } from './dudes/actions'
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

const addButtonStyle = {
  background: 'none',
  border: 'solid 1px',
  font: 'inherit',
  cursor: 'pointer',
  height: '30px',
  fontSize: 'inherit',
  borderRadius: 5
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
              <div key={index} >You owe {dudeName} {amount}</div>
            ))}
            <div style={listStyle}>
              {(this.props.amountsOwedToYou.length === 0) && (
                <div>You aren't owed anything...</div>
              )}
              {this.props.amountsOwedToYou.map(({dudeName, amount}, index) => (
                <div key={index} >{dudeName} owes you {amount}</div>
              ))}
            </div>
            <input style={addButtonStyle}
              type='button'
              value={`Remove ya ${this.props.name}!`}
              onClick={() => this.props.removeDude(this.props.dudeId)}
            />
          </div>
        </div>
      )
      : null
  }
}

const mapStateToProps = (state, ownProps) => ({
  dudeId: selectSelectedDudeId(state),
  name: selectSelectedDudeId(state)
    ? selectDudesName(state, selectSelectedDudeId(state))
    : null,
  amountsYouOwe: selectSelectedDudeId(state)
    ? selectAmountsOwedByDude(state, selectSelectedDudeId(state))
    : [],
  amountsOwedToYou: selectSelectedDudeId(state)
    ? selectAmountsOwedToDude(state, selectSelectedDudeId(state))
    : [],
})

const mapDispatchToProps = (dispatch) => ({
  removeDude: dudeId => dispatch(removeDude(dudeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettleUpSummary)
