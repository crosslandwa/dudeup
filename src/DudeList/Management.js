import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector } from './interactions'
import EditableDude from './EditableDude'
import EditDudeAccordian from './EditDudeAccordian'

const mapStateToProps = (state) => ({
  dudeIds: dudeIdsSelector(state)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showAccordian: false }

    this.toggleAddDude = e => {
      this.setState(state => {
        if (state.showAccordian) {
          this.closeAndRefocus()
        } else {
          return ({ showAccordian: !state.showAccordian })
        }
      })
    }

    this.close = (reFocus = false) => {
      this.setState({ showAccordian: false, reFocus })
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
    return (
      <>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {this.props.dudeIds.map(id => <EditableDude id={id} />)}
          <button class={`du-button du-button--text-only ${this.state.showAccordian ? 'du-flyout--below' : ''}`} ref={this.captureRef} onClick={this.toggleAddDude}>
            <span class="du-button__label">Add dude</span>
          </button>
        </div>
        {this.state.showAccordian && (
          <EditDudeAccordian closeExplicit={this.closeAndRefocus} closeImplicit={this.close} />
        )}
      </>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
