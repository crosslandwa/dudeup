import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameBadge from './NameBadge'
import SelectedDudeContainer from './SelectedDudeContainer'
import { selectAllDudeIds } from './selectors'
import { addDude } from './actions'
import { selectListName } from '../lists/selectors'
import ClickableButton from '../dumbui/ClickableButton'

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

const ClickableButtonStyle = fullWidth => ({
  width: fullWidth ? '90%' : '15%',
  marginLeft: '2%'
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
        {hasDudes && <div style={headerStyle} >Dudes taking part in {this.props.listName || 'list'}</div>}
        <div style={styles} >
          <ClickableButton
            style={ClickableButtonStyle(!hasDudes)}
            value={hasDudes ? 'Add dude' : 'Click here to add a dude to the list'}
            onClick={this.props.addDude}
          />
          {hasDudes && (
            <div style={nameListStyle}>
              {this.props.ids.map(dudeId => (
                <div style={{ margin: '1%' }} key={dudeId} >
                  <SelectedDudeContainer>
                    <NameBadge dudeId={dudeId} />
                  </SelectedDudeContainer>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { selectedListId }) => ({
  ids: selectAllDudeIds(state),
  listName: selectListName(state, selectedListId)
})

const mapDispatchToProps = (dispatch, { selectedListId }) => ({
  addDude: () => dispatch(addDude(selectedListId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NamesStrip)
