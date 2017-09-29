import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectListName } from './lists/selectors'
import { selectDudesName } from './dudes/selectors'
import { removeDude } from './dudes/actions'
import { removeList } from './lists/actions'
import { black, overcast, paper } from './colours'
import ClickableButton from './dumbui/ClickableButton'

const styles = {
  display: 'flex',
  width: '95%',
  padding: '2.5% 2.5%',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const buttonStyleDisabled = {
  background: overcast,
  color: paper,
  marginLeft: '1%',
  width: '30%',
  cursor: 'initial',
}

const buttonStyleEnabled = {
  ...buttonStyleDisabled,
  color: black,
  cursor: 'pointer',
}

class Removals extends Component {
  render() {
    return !this.props.selectedListId
      ? null
      : (
      <div style={styles} >
        <ClickableButton
          style={!!this.props.selectedDudeId ? buttonStyleEnabled : buttonStyleDisabled}
          value={`Delete ${this.props.selectedDudeName}`}
          onClick={!this.props.selectedDudeId ? null : this.props.removeDude}
        />
        <ClickableButton
          style={!!this.props.selectedListId ? buttonStyleEnabled : buttonStyleDisabled}
          value={`Delete ${this.props.selectedListName}`}
          onClick={this.props.removeList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, { selectedDudeId, selectedListId }) => ({
  selectedDudeName: selectedDudeId ? selectDudesName(state, selectedDudeId) || 'Dude' : 'Dude',
  selectedListName: selectedListId ? selectListName(state, selectedListId) || 'List' : 'List'
})

const mapDispatchToProps = (dispatch, { selectedDudeId, selectedListId }) => ({
  removeDude: () => dispatch(removeDude(selectedDudeId)),
  removeList: () => { if (selectedListId) dispatch(removeList(selectedListId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Removals)
