import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAverageCostPerDude, selectTotalItemCost } from './items/selectors'

const styles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  height: 60,
  alignItems: 'center'
}

const leftTextStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  width: '45%'
}

const rightTextStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '45%'
}

class GroupSummary extends Component {
  render() {
    return (
      <div style={styles} >
        <div style={leftTextStyle} ><span>Group spend: {this.props.groupTotal.toFixed(2)}</span></div>
        <div style={rightTextStyle} ><span>Average spend per Dude: {this.props.averageSpendPerDude.toFixed(2)}</span></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  averageSpendPerDude: selectAverageCostPerDude(state),
  groupTotal: selectTotalItemCost(state)
})

export default connect(mapStateToProps)(GroupSummary)
