import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDudesName, selectSelectedDudeId } from './dudes/selectors'
import { selectDude } from './dudes/actions'

const styles = (selected) => ({
  height: 48,
  minWidth: 60,
  backgroundColor: selected ? '#f5d55d' : '#adffc0',
  borderRadius: 10,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  padding: '0 4px'
})

class NameBadge extends Component {
  render() {
    return (
      <div style={styles(this.props.selected)} onClick={this.props.select} >
        <span>{this.props.name}</span>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: selectDudesName(state, ownProps.dudeId),
  selected: selectSelectedDudeId(state) === ownProps.dudeId
})

const mapDispatchToProps = (dispatch, { dudeId }) => ({
  select: () => dispatch(selectDude(dudeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NameBadge)
