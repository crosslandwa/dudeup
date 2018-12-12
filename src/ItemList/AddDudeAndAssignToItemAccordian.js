import React from 'react'
import { connect } from 'react-redux'
import { addDudeAndAssignToItem } from './interactions'
import Accordian from '../Accordian'
import { textInputStyle } from '../styles'

class AddDudeAndAssignToItemAccordian extends React.Component {
  constructor (props) {
    super(props)

    this.state = { name: undefined }

    this.handleTextInput = event => {
      this.setState({ name: event.target.value })
    }

    this.submit = () => {
      this.state.name && this.props.addDudeAndAssignToItem(this.state.name, this.props.itemId)
      this.props.close()
    }
  }

  render () {
    return (
      <Accordian onCancel={this.props.close} onSubmit={this.submit} submitButtonText="Add" title="Item bought by new dude...">
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label>
            Name:
            <input style={textInputStyle} autoFocus type="textbox" onChange={this.handleTextInput}/>
          </label>
        </div>
      </Accordian>
    )
  }
}

export default connect(null, { addDudeAndAssignToItem })(AddDudeAndAssignToItemAccordian)
