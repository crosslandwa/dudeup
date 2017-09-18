import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectListName } from './lists/selectors'
import { selectDudesName, selectAllDudeIdsForList } from './dudes/selectors'
import { removeDude } from './dudes/actions'
import { removeList } from './lists/actions'
import { black, overcast, paper } from './colours'

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
  border: 'solid 1px',
  font: 'inherit',
  marginLeft: '1%',
  height: '30px',
  fontSize: 'inherit',
  borderRadius: 5,
  width: '30%'
}

const buttonStyleEnabled = {
  ...buttonStyleDisabled,
  background: 'none',
  color: black,
  cursor: 'pointer',
}

class Removals extends Component {
  render() {
    return (
      <div style={styles} >
        <input style={!!this.props.selectedDudeId ? buttonStyleEnabled : buttonStyleDisabled}
          type="button"
          value={`Delete ${this.props.selectedDudeName}`}
          onClick={!this.props.selectedDudeId ? null : this.props.removeDude}
          // onKeyPress={this.props.enter}
        />
        <input style={!!this.props.selectedListId ? buttonStyleEnabled : buttonStyleDisabled}
          type="button"
          value={`Delete ${this.props.selectedListName}`}
          onClick={() => {if (this.props.selectedListId) this.props.removeList(this.props.selectedListDudeIds)}}
          // onKeyPress={this.props.enter}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, { selectedDudeId, selectedListId }) => ({
  selectedDudeName: selectedDudeId ? selectDudesName(state, selectedDudeId) : 'Dude',
  selectedListName: selectedListId ? selectListName(state, selectedListId) : 'List',
  selectedListDudeIds: selectedListId ? selectAllDudeIdsForList(state, selectedListId) : []
})

const mapDispatchToProps = (dispatch, { selectedDudeId, selectedListId }) => ({
  removeDude: () => dispatch(removeDude(selectedDudeId)),
  removeList: (dudeIds) => dispatch(removeList(selectedListId, dudeIds))
})

export default connect(mapStateToProps, mapDispatchToProps)(Removals)
