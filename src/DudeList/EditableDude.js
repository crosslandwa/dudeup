import React from 'react'
import { connect } from 'react-redux'
import { dudeCanBeRemovedSelector, dudeNameSelector, removeDude, updateDudeName } from './interactions'
import { textButtonStyle, textInputStyle } from '../styles'
import Accordian from '../Accordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = (state, { id }) => ({
  name: dudeNameSelector(state, id),
  isRemovable: dudeCanBeRemovedSelector(state, id)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editOpen: false, name: this.props.name }

    this.closeEdit = () => {
      this.setState({ editOpen: false, name: this.props.name })
    }

    this.toggleEditOpen = e => {
      this.setState(state => ({ editOpen: !state.editOpen }))
    }

    this.handleTextInput = e => {
      this.setState({ name: e.target.value })
    }

    this.updateName = e => {
      this.props.updateDudeName(this.props.id, this.state.name)
      this.closeEdit()
    }

    this.remove = e => {
      this.props.removeDude(this.props.id)
      this.closeEdit()
    }
  }

  render () {
    const edit = !!this.state.editOpen
    return (
      <div style={{ margin: '0 1em 0.25em 0' }}>
        <WithFlyoutArrowBelow show={edit} >
          <input type="button" style={textButtonStyle} onClick={this.toggleEditOpen} value={this.props.name} />
        </WithFlyoutArrowBelow>
        {this.state.editOpen && (
          <Accordian onCancel={this.closeEdit} onSubmit={this.updateName} title={`Update ${this.props.name}`}>
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <label>
                Name:
                <input style={textInputStyle} value={this.state.name} autoFocus type="textbox" onChange={this.handleTextInput}/>
              </label>
            </div>
            <div>
              <input style={textButtonStyle} type="submit" value="Update" />
            </div>
            {this.props.isRemovable
              ? <input type="button" style={textButtonStyle} onClick={this.remove} value="Remove" />
              : (
                <React.Fragment>
                  <input type="button" style={textButtonStyle} disabled="true" value="Remove" />
                  <div><em>Dudes who have bought (or are sharing) items can not be removed</em></div>
                </React.Fragment>
              )
            }
          </Accordian>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, { removeDude, updateDudeName })(DudeManagement)
