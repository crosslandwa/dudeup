import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from './interactions'
import { textButtonStyle, textInputStyle } from '../styles'
import Accordian from '../Accordian'
import { flyoutHighlight, WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editOpen: false }

    this.closeEdit = () => {
      this.setState({ editOpen: false })
    }

    this.toggleEditOpen = e => {
      this.setState(state => ({ editOpen: !state.editOpen }))
    }
  }

  render () {
    const edit = !!this.state.editOpen
    return (
      <div style={{ margin: '0 1em 0.25em 0' }}>
        <WithFlyoutArrowBelow show={edit} >
          <input type="button" style={{ ...textButtonStyle, ...(edit ? flyoutHighlight : {}) }} onClick={this.toggleEditOpen} value={this.props.name} />
        </WithFlyoutArrowBelow>
        {this.state.editOpen && (
          <Accordian onCancel={this.closeEdit} onSubmit={() => {}} submitButtonText="Save" title={`Edit ${this.props.name}`}>
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <label>
                Name:
                <input style={textInputStyle} value={this.props.name} autoFocus type="textbox" onChange={this.handleTextInput}/>
              </label>
            </div>
          </Accordian>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
