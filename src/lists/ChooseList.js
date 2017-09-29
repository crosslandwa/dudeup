import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAllListIds } from './selectors'
import { addList } from './actions'
import { paper } from '../colours'
import ListBadge from './ListBadge'
import SelectedListContainer from './SelectedListContainer'

const styles = {
  display: 'flex',
  width: '100%',
  minHeight: 62,
  justifyContent: 'space-around',
  height: '100%',
  alignItems: 'center',
  lineHeight: 'initial'
}

const nameListStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const addButtonStyle = (fullWidth) => ({
  background: 'none',
  border: `solid 1px ${paper}`,
  font: 'inherit',
  cursor: 'pointer',
  width: fullWidth ? '90%' : '15%',
  height: '30px',
  fontSize: 'inherit',
  marginLeft: fullWidth ? 0 : '2%',
  borderRadius: 5,
  color: paper
})

class ChooseList extends Component {
  render() {
    return (
      <div style={styles} >
        <input style={addButtonStyle(this.props.ids.length === 0)}
          type="button"
          value={this.props.ids.length ? 'New list:' : 'Click here to create a list and get started'}
          onClick={this.props.addList}
        />
        {this.props.ids.length > 0 && (
          <div style={nameListStyle}>
            {this.props.ids.map(id => (
              <div style={{margin: '1%'}} key={id} >
                <SelectedListContainer>
                  <ListBadge id={id} />
                </SelectedListContainer>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ids: selectAllListIds(state),
})

const mapDispatchToProps = { addList }

export default connect(mapStateToProps, mapDispatchToProps)(ChooseList)
