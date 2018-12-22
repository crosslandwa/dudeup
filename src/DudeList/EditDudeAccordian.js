import React from 'react'
import { connect } from 'react-redux'
import { addDude, dudeCanBeRemovedSelector, dudeNameSelector, removeDude, updateDudeName } from './interactions'
import Accordian from '../Accordian'
import { textButtonStyle, textInputStyle } from '../styles'
import { addWarningNotification } from '../Notifications/interactions'

const mapStateToProps = (state, { id }) => ({
  name: id ? dudeNameSelector(state, id) : '',
  isRemovable: id ? dudeCanBeRemovedSelector(state, id) : false
})

class EditDudeAccordian extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: this.props.name }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }

    this.remove = e => {
      this.props.removeDude(this.props.id)
      this.props.close()
    }

    this.submit = () => {
      if (!this.state.name) {
        this.props.addWarningNotification(`Did not ${this.props.id ? 'update' : 'add'} Dude - name required`)
      } else if (this.props.id) {
        this.props.updateDudeName(this.props.id, this.state.name)
        this.props.close()
      } else {
        this.state.name && this.props.addDude(this.state.name)
        this.props.close()
      }
    }
  }

  render () {
    return (
      <Accordian onCancel={this.props.close} onSubmit={this.submit} title={this.props.id ? `Update ${this.props.name}` : 'Add dude'}>
        <input style={{
          ...textInputStyle,
          boxSizing: 'border-box',
          width: '100%'
        }} autoFocus type="textbox" onChange={this.handleTextInput} value={this.state.name} placeholder="Name"/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '85%',
          marginTop: '0.5em'
        }}>
          <input style={textButtonStyle} type="submit" value={this.props.id ? 'Update' : 'Add'} />
          {this.props.id && (
            <input
              type="button"
              style={textButtonStyle}
              disabled={!this.props.isRemovable}
              onClick={this.remove}
              value="Remove"
            />
          )}
        </div>
        {this.props.id && !this.props.isRemovable && (
          <div style={{ fontSize: '85%', marginTop: '0.5em', textAlign: 'right' }}>
            <em>Dudes who have bought (or are sharing) items can not be removed</em>
          </div>
        )}
      </Accordian>
    )
  }
}

export default connect(mapStateToProps, { addDude, addWarningNotification, removeDude, updateDudeName })(EditDudeAccordian)
