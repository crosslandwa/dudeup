import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemList from './ItemList'
import { selectSelectedDudeId } from '../dudes/selectors'

class Items extends Component {
  render() {
    return this.props.selectedDudeId
      ? <ItemList selectedDudeId={this.props.selectedDudeId} />
      : null //'Select a dude above to see/edit what they paid for...'
  }
}

const mapStateToProps = state => ({
  selectedDudeId: selectSelectedDudeId(state)
})

export default connect(mapStateToProps)(Items)
