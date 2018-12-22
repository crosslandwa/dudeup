import React from 'react'
import { connect } from 'react-redux'
import { addDude } from './interactions'
import Accordian from '../Accordian'
import { textButtonStyle, textInputStyle } from '../styles'

class AddDudeAccordian extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: undefined }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }

    this.submit = () => {
      this.state.name && this.props.addDude(this.state.name)
      this.props.close()
    }
  }

  render () {
    return (
      <Accordian onCancel={this.props.close} onSubmit={this.submit} title="Add dude">
        <input style={{
          ...textInputStyle,
          boxSizing: 'border-box',
          width: '100%'
        }} autoFocus type="textbox" onChange={this.handleTextInput} placeholder="Name"/>
        <div style={{ marginTop: '0.5em' }}>
          <input style={textButtonStyle} type="submit" value="Add" />
        </div>
      </Accordian>
    )
  }
}

export default connect(null, { addDude })(AddDudeAccordian)
