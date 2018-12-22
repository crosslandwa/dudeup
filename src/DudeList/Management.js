import React from 'react'
import { connect } from 'react-redux'
import { dudeIdsSelector } from './interactions'
import { textButtonStyle } from '../styles'
import EditableDude from './EditableDude'
import AddDudeAccordian from './AddDudeAccordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = (state) => ({
  dudeIds: dudeIdsSelector(state)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }

    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }

    this.toggleAddDude = e => {
      this.setState(state => ({ modalOpen: !state.modalOpen }))
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
            <input style={{ ...textButtonStyle, display: 'block' }} type="button" onClick={this.toggleAddDude} value="Add dude" />
          </WithFlyoutArrowBelow>
        </div>
        {this.state.modalOpen && (
          <AddDudeAccordian close={this.closeModal} />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
