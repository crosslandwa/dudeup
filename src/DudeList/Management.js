import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector } from './interactions'
import EditableDude from './EditableDude'
import EditDudeAccordian from './EditDudeAccordian'
import { closeAccordian, openAccordian, isAccordianOpen } from '../Accordian/interactions'

const mapStateToProps = (state) => ({
  dudeIds: dudeIdsSelector(state),
  showAccordian: isAccordianOpen(state, 'addDude')
})

const mapDispatchToProps = dispatch => ({
  closeDudeAccordion: () => dispatch(closeAccordian()),
  openDudeAccordion: () => dispatch(openAccordian('addDude'))
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { reFocus: false }

    this.toggleAddDude = e => {
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
    const { dudeIds, showAccordian } = this.props
    return (
      <>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {dudeIds.map(id => <EditableDude id={id} />)}
          <button class={`du-button du-button--text-only ${showAccordian ? 'du-flyout--below' : ''}`} ref={this.captureRef} onClick={this.toggleAddDude}>
            <span class="du-button__label">Add dude</span>
          </button>
        </div>
        {showAccordian && (
          <EditDudeAccordian onClose={this.closeAndRefocus} />
        )}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DudeManagement)
