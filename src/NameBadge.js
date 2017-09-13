import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
import { selectDude, updateDudeName } from './dudes/actions'

const styles = (selected) => ({
  height: 48,
  minWidth: 60,
  maxWidth: 100,
  backgroundColor: selected ? '#f5d55d' : '#adffc0',
  borderRadius: 10,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 4px',
})

const inputStyle = {
  width: '100%',
  fontFamily: 'sans-serif',
  fontSize: 'inherit',
  background: 'none',
  border: 'none',
  height: '100%',
  textAlign: 'center',
}

class NameBadge extends Component {
  render() {
    return (
      <div style={styles(this.props.selected)}>
        <input
          style={inputStyle}
          type="text"
          value={this.props.name}
          onChange={this.props.updateName}
          onClick={this.props.select}
          placeholder="Enter a name..."
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: selectDudesName(state, ownProps.dudeId),
  selected: selectSelectedDudeId(state) === ownProps.dudeId
})

const mapDispatchToProps = (dispatch, { dudeId }) => ({
  select: () => dispatch(selectDude(dudeId)),
  updateName: (event) => dispatch(updateDudeName(dudeId, event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NameBadge)
