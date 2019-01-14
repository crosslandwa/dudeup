import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from './interactions'
import { textButtonStyle } from '../styles'
import EditDudeAccordian from './EditDudeAccordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

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
          <input type="button" style={textButtonStyle} onClick={this.toggleEditOpen} value={this.props.name} />
        </WithFlyoutArrowBelow>
        {this.state.editOpen && <EditDudeAccordian id={this.props.id} closeExplicit={this.closeEdit} closeImplicit={this.closeEdit} />}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
