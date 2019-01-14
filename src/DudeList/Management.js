import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector } from './interactions'
import EditableDude from './EditableDude'
import EditDudeAccordian from './EditDudeAccordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'
import AddButton from '../GenericUi/AddButton'

const mapStateToProps = (state) => ({
  dudeIds: dudeIdsSelector(state)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    this.toggleAddDude = e => {
      this.setState(state => ({ modalOpen: !state.modalOpen }))
    }

    this.close = (reFocus = false) => {
      this.setState({ modalOpen: false, reFocus })
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
      <div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {this.props.dudeIds.map(id => <EditableDude id={id} />)}
          <WithFlyoutArrowBelow show={this.state.modalOpen} >
            <AddButton ref={this.captureRef} label="Add dude" onClick={this.toggleAddDude} />
          </WithFlyoutArrowBelow>
        </div>
        {this.state.modalOpen && (
          <EditDudeAccordian closeExplicit={this.closeAndRefocus} closeImplicit={this.close} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
