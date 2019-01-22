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

const FullWidthHack = props => (
  <div style={{
    height: (props.tall) ? '10em' : '8em'
  }}>
    <div style={{
      position: 'absolute',
      left: '0',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 800,
        padding: '0 0.5em'
      }}>
        {props.children}
      </div>
    </div>
  </div>
)

class EditDudeAccordian extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: this.props.name }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }

    this.remove = e => {
      this.props.removeDude(this.props.id)
      this.props.closeImplicit()
    }

    this.submit = () => {
      if (!this.state.name) {
        this.props.addWarningNotification(`Did not ${this.props.id ? 'update' : 'add'} Dude - name required`)
      } else if (this.props.id) {
        this.props.updateDudeName(this.props.id, this.state.name)
        this.props.closeExplicit()
      } else {
        this.state.name && this.props.addDude(this.state.name)
        this.props.closeExplicit()
      }
    }
  }

  render () {
    const { closeExplicit, closeImplicit } = this.props

    return (
      <FullWidthHack tall={this.props.id && !this.props.isRemovable}>
        <Accordian closeExplicit={closeExplicit} closeImplicit={closeImplicit} onSubmit={this.submit} title={this.props.id ? `Update ${this.props.name}` : 'Add dude'}>
          <input style={{
            ...textInputStyle,
            boxSizing: 'border-box',
            width: '100%'
          }} autoFocus type="textbox" onChange={this.handleTextInput} value={this.state.name} placeholder="Name"/>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
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
      </FullWidthHack>
    )
  }
}

export default connect(mapStateToProps, { addDude, addWarningNotification, removeDude, updateDudeName })(EditDudeAccordian)
