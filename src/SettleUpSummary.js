import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
import { selectAmountsOwedByDude, selectAmountsOwedToDude } from './settleup/selectors'

const styles = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#333333',
  backgroundColor: '#f5d55d',
  alignItems: 'center'
}

const headerStyle = {
  lineHeight: '30px',
  fontWeight: 'bold',
  textAlign: 'left',
  marginLeft: '2px'
}

const listStyle = {
  marginTop: '5px',
  marginBottom: '5px'
}

class SettleUpSummary extends Component {
  render() {
    return (
      <div>
        <div style={styles} >
          <div style={headerStyle} >
            {this.props.name
              ? `Owed by ${this.props.name}`
              : '... and see what they owe'
            }
          </div>
          <div style={listStyle}>
            {this.props.dudeId && (this.props.amountsYouOwe.length === 0) && (
              <div>You don't owe anything!</div>
            )}
            {this.props.amountsYouOwe.map(({dudeName, amount}, index) => (
              <div key={index} >You owe {dudeName} {amount}</div>
            ))}
          </div>
          <div style={listStyle}>
            {this.props.dudeId && (this.props.amountsOwedToYou.length === 0) && (
              <div>You aren't owed anything...</div>
            )}
            {this.props.amountsOwedToYou.map(({dudeName, amount}, index) => (
              <div key={index} >{dudeName} owes you {amount}</div>
            ))}
          </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps)(SettleUpSummary)
