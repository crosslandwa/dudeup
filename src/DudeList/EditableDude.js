import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from './interactions'
import EditDudeAccordian from './EditDudeAccordian'
import { closeAccordian, openAccordian, isAccordianOpen } from '../Accordian/interactions'

const mapStateToProps = (state, { id }) => ({
  name: dudeNameSelector(state, id),
  showAccordian: isAccordianOpen(state, `editDude-${id}`)
})

const mapDispatchToProps = (dispatch, { id }) => ({
  closeDudeAccordion: () => dispatch(closeAccordian()),
  openDudeAccordion: () => dispatch(openAccordian(`editDude-${id}`))
})

class EditableDude extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editOpen: false }

    this.toggleEditOpen = e => {
      this.setState(state => {
        if (this.props.showAccordian) {
          this.closeAndRefocus()
        } else {
          this.props.openDudeAccordion()
        }
      })
    }

    this.closeAndRefocus = () => {
      this.props.closeDudeAccordion()
      this.setState({ reFocus: true })
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
    const { id, name, showAccordian } = this.props
    return (
      <div style={{ margin: '0 1em 0.25em 0' }}>
        <button ref={this.captureRef} class={`du-button ${showAccordian ? 'du-flyout--below' : ''}`} onClick={this.toggleEditOpen}>
          <span class="du-button__label du-button__label--name">{name}</span>
        </button>
        {showAccordian && <EditDudeAccordian id={id} onClose={this.closeAndRefocus} />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableDude)
