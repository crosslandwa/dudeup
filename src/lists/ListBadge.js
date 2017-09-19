import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectListName, selectSelectedListId } from './selectors'
import { selectList, updateListName } from './actions'
import { overcast, lavender } from '../colours'

const styles = (selected) => ({
  height: 48,
  minWidth: 60,
  maxWidth: 100,
  backgroundColor: selected ? overcast : lavender,
  borderRadius: 5,
  borderStyle: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 4px',
  font: 'inherit',
  textAlign: 'center',
  margin: '1%'
})

class ListBadge extends Component {
  render() {
    return (
      <input
        style={styles(this.props.selected)}
        type="text"
        value={this.props.name}
        onChange={this.props.updateName}
        onClick={this.props.select}
        placeholder="New list..."
        onKeyPress={this.props.enter}
        autoFocus
      />
    )
  }
}

const mapStateToProps = (state, { id }) => ({
  name: selectListName(state, id),
  selected: selectSelectedListId(state) === id
})

const mapDispatchToProps = (dispatch, { id }) => ({
  enter: event => { if (event.key === 'Enter') dispatch(selectList(id)) },
  select: () => dispatch(selectList(id)),
  updateName: (event) => dispatch(updateListName(id, event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListBadge)
