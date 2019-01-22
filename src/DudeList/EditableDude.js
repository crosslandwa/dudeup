import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from './interactions'
import { textButtonStyle } from '../styles'
import EditDudeAccordian from './EditDudeAccordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const buttonStyle = {
  ...textButtonStyle,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '20em'
}

const mapStateToProps = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editOpen: false }

    this.toggleEditOpen = e => {
      this.setState(state => {
        if (state.editOpen) {
          this.closeAndRefocus()
        } else {
          return ({ editOpen: !state.editOpen })
        }
      })
    }

    this.close = (reFocus = false) => {
      this.setState({ editOpen: false, reFocus })
    }

    this.closeAndRefocus = () => {
      this.close(true)
    }

    this.captureRef = node => {
      this.ref = node
    }
  }

  componentDidUpdate () {
    if (this.ref && this.state.reFocus) {
      this.setState(state => {
        this.ref.focus()
        return { reFocus: false }
      })
    }
  }

  render () {
    const edit = !!this.state.editOpen
    return (
      <div style={{ margin: '0 1em 0.25em 0' }}>
        <WithFlyoutArrowBelow show={edit} >
          <input ref={this.captureRef} type="button" style={buttonStyle} onClick={this.toggleEditOpen} value={this.props.name} />
        </WithFlyoutArrowBelow>
        {this.state.editOpen && <EditDudeAccordian id={this.props.id} closeExplicit={this.closeAndRefocus} closeImplicit={this.close} />}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
