import React, { Component } from 'react'
import { connect } from 'react-redux'
import NamesStrip from './NamesStrip'
import GroupSummary from './GroupSummary'
import LoadingBadge from '../dumbui/LoadingBadge'
import { overcast } from '../colours'
import { selectIsListRecordLoading, selectSelectedListId } from '../lists/selectors'

const styles = {
  borderRadius: 5,
  backgroundColor: overcast,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

class Dudes extends Component {
  render() {
    if (!this.props.selectedListId) return null

    return this.props.loading
      ? (
        <div style={styles} className="App-group">
          <LoadingBadge />
        </div>
      ) : (
        <div style={styles} className="App-group">
          <NamesStrip selectedListId={this.props.selectedListId} />
          <GroupSummary />
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  loading: selectIsListRecordLoading(state),
  selectedListId: selectSelectedListId(state)
})

export default connect(mapStateToProps)(Dudes)
