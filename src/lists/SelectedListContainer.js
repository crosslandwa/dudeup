import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSelectedListId } from './selectors'

class SelectedListContainer extends Component {
  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child => React.cloneElement(child, { selectedListId: this.props.selectedListId }))}
      </div>
    )
  }
}

const mapStateToProps = (state, { id }) => ({
  selectedListId: selectSelectedListId(state)
})

export default connect(mapStateToProps)(SelectedListContainer)
