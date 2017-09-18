import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameBadge from './NameBadge'
import { selectAllDudeIsForList } from './selectors'
import { addDude } from './actions'
import { selectListName } from '../lists/selectors'

const styles = {
  display: 'flex',
  width: '100%',
  minHeight: 62,
  justifyContent: 'space-around',
  alignItems: 'center'
}

const nameListStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const addButtonStyle = fullWidth => ({
  background: 'none',
  border: 'solid 1px',
  font: 'inherit',
  cursor: 'pointer',
  width: fullWidth ? '90%' : '15%',
  height: '30px',
  fontSize: 'inherit',
  marginLeft: '2%',
  borderRadius: 5
})

const headerStyle = {
  lineHeight: '30px',
  fontWeight: 'bold'
}

class NamesStrip extends Component {
  render() {
    const hasDudes = this.props.ids.length > 0
    return (
      <div style={{width: '100%'}}>
        {hasDudes && <div style={headerStyle} >Dudes taking part in {this.props.listName}</div>}
        <div style={styles} >
          <input style={addButtonStyle(!hasDudes)}
            type="button"
            value={hasDudes ? 'Add dude:' : 'Click here to add a dude to the list'}
            onClick={this.props.addDude}
          />
          {hasDudes && (
            <div style={nameListStyle}>
              {this.props.ids.map(dudeId => (
                <NameBadge key={dudeId} dudeId={dudeId} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { selectedListId }) => ({
  ids: selectAllDudeIsForList(state, selectedListId),
  listName: selectListName(state, selectedListId)
})

const mapDispatchToProps = (dispatch, { selectedListId }) => ({
  addDude: () => dispatch(addDude(selectedListId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NamesStrip)
