import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector, dudeNameSelector } from './interactions'
import { textButtonStyle } from '../styles'
import AddDudeAccordian from './AddDudeAccordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = (state) => ({
  dudes: dudeIdsSelector(state).map(id => ({ id, name: dudeNameSelector(state, id) }))
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }

    this.toggleAddDude = e => {
      this.setState({ modalOpen: this.state.modalOpen === '_add_dude_' ? false : '_add_dude_' })
    }
  }

  render () {
    return (
      <div style={{ marginBottom: '1em' }}>
        <WithFlyoutArrowBelow show={!!this.state.modalOpen} >
          <input style={{ ...textButtonStyle, display: 'block' }} type="button" onClick={this.toggleAddDude} value="Add dude" />
        </WithFlyoutArrowBelow>
        {this.state.modalOpen && (
          <AddDudeAccordian close={this.closeModal} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
