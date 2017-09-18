import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSelectedDudeId } from './selectors'

class SelectedDudeContainer extends Component {
  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child => React
          .cloneElement(child, {
            selectedListId: this.props.selectedListId,
            selectedDudeId: this.props.selectedDudeId
          }))}
      </div>
    )
  }
}

const mapStateToProps = (state, { id }) => ({
  selectedDudeId: selectSelectedDudeId(state)
})

export default connect(mapStateToProps)(SelectedDudeContainer)
