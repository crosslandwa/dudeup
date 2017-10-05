import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectListName, selectSelectedListId } from './lists/selectors'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
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
          className="button--darkHighlight"
          value={`Delete ${this.props.selectedDudeName}`}
          onClick={!this.props.selectedDudeId ? null : () => this.props.removeDude(this.props.selectedDudeId)}
        />
        <ClickableButton
          style={!!this.props.selectedListId ? buttonStyleEnabled : buttonStyleDisabled}
          className="button--darkHighlight"
          value={`Delete ${this.props.selectedListName}`}
          onClick={() => this.props.removeList(this.props.selectedListId)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const selectedDudeId = selectSelectedDudeId(state)
  const selectedListId = selectSelectedListId(state)
  return {
    selectedDudeId,
    selectedDudeName: selectedDudeId ? selectDudesName(state, selectedDudeId) || 'Dude' : 'Dude',
    selectedListId,
    selectedListName: selectedListId ? selectListName(state, selectedListId) || 'List' : 'List'
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeDude: selectedDudeId => dispatch(removeDude(selectedDudeId)),
  removeList: selectedListId => dispatch(removeList(selectedListId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Removals)
