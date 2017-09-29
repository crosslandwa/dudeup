import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectAllListIds } from './selectors'
import { addList } from './actions'
import { paper } from '../colours'
import ListBadge from './ListBadge'
import SelectedListContainer from './SelectedListContainer'
import ClickableButton from '../dumbui/ClickableButton'

const styles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const nameListStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const ClickableButtonStyle = (fullWidth) => ({
  borderColor: paper,
  width: fullWidth ? '90%' : '15%',
  marginLeft: fullWidth ? 0 : '2%',
  color: paper
})

class ListChooser extends Component {
  render() {
    return (
      <div style={styles} >
        <ClickableButton
          style={ClickableButtonStyle(this.props.ids.length === 0)}
          value={this.props.ids.length ? 'New list' : 'Click here to create a list and get started'}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListChooser)
