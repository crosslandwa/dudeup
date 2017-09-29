import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAreListsLoading } from './selectors'
import LoadingBadge from '../dumbui/LoadingBadge'
import ListChooser from './ListChooser'

const styles = {
  display: 'flex',
  width: '100%',
  minHeight: 62,
  justifyContent: 'space-around',
  height: '100%',
  alignItems: 'center',
  lineHeight: 'initial'
}

class ListsSection extends Component {
  render() {
    return (
      <div style={styles} >
        {this.props.loading ? (
          <LoadingBadge />
        ) : (
          <ListChooser />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: selectAreListsLoading(state)
})

export default connect(mapStateToProps)(ListsSection)
