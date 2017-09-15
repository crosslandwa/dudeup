import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameBadge from './NameBadge'
import { selectAllDudeIds } from './dudes/selectors'
import { addDude } from './dudes/actions'

const styles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
  height: 60,
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#333333',
  backgroundColor: '#5df580',
  alignItems: 'center'
}

const dudesStyle = {
  borderRight: '#333333 2px solid',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  flexDirection: 'column'
}

const addButtonStyle = {
  background: 'none',
  border: 'none',
  font: 'inherit',
  cursor: 'pointer',
  width: '80%',
  height: '30px',
  fontSize: 'inherit',
  backgroundColor: '#e9ffee',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
}

class NamesStrip extends Component {
  render() {
    return (
      <div style={styles} >
        <div style={dudesStyle} >
          <span>Dudes:</span>
          <input style={addButtonStyle}
            type="button"
            value="add"
            onClick={this.props.addDude}
          />
        </div>
        {this.props.ids.map(dudeId => (
            <NameBadge key={dudeId} dudeId={dudeId} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ids: selectAllDudeIds(state),
})

const mapDispatchToProps = { addDude }

export default connect(mapStateToProps, mapDispatchToProps)(NamesStrip)
