import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
import { selectDude, updateDudeName } from './dudes/actions'
import { dusty, lavender } from './colours'

const styles = (selected) => ({
  height: 48,
  minWidth: 60,
  maxWidth: 100,
  backgroundColor: selected ? dusty : lavender,
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

class NameBadge extends Component {
  render() {
    return (
      <input
        style={styles(this.props.selected)}
        type="text"
        value={this.props.name}
        onChange={this.props.updateName}
        onClick={this.props.select}
        placeholder="Enter a name..."
        onKeyPress={this.props.enter}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: selectDudesName(state, ownProps.dudeId),
  selected: selectSelectedDudeId(state) === ownProps.dudeId
})

const mapDispatchToProps = (dispatch, { dudeId }) => ({
  enter: event => { if (event.key === 'Enter') dispatch(selectDude(dudeId)) },
  select: () => dispatch(selectDude(dudeId)),
  updateName: (event) => dispatch(updateDudeName(dudeId, event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NameBadge)
