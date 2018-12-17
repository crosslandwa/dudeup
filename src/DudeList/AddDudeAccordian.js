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
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>
            Name:
            <input style={textInputStyle} autoFocus type="textbox" onChange={this.handleTextInput}/>
          </label>
        </div>
        <div>
          <input style={textButtonStyle} type="submit" value="Add" />
        </div>
      </Accordian>
    )
  }
}

export default connect(null, { addDude })(AddDudeAccordian)
