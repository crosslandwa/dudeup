import React from 'react'
import { connect } from 'react-redux'
import { clear } from '../Clear/interactions'
import Accordian from '../Accordian'
import { addNotification } from '../Notifications/interactions'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

class AboutAndClear extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modal: false }

    this.openModal = (e) => {
      e && e.preventDefault()
      this.setState({ modal: true })
    }

    this.closeModal = () => {
      this.setState({ modal: false })
    }

    this.clear = () => {
      this.props.clear()
      this.props.addNotification('All Dudes and Items have been cleared')
      this.closeModal()
    }
  }

  render () {
    return (
      <div class="du-about-and-clear">
        <WithFlyoutArrowBelow show={this.state.modal}>
          <a class="du-anchor" href="" onClick={this.openModal}>About</a>
        </WithFlyoutArrowBelow>
        {this.state.modal && (
          <Accordian closeExplicit={this.closeModal} closeImplicit={this.closeModal} onSubmit={this.closeModal} title="About">
            <div>
              <p>Take the maths out of settling up the cost of group activities.</p>
              <ul>
                <li>Add dudes <em>(Press "Add dude")</em></li>
                <li>Record bought items <em>(Press "Add item")</em></li>
                <li>Note how much was spent on each item and (optionally) who shared it <em>(Click an item to edit it)</em></li>
              </ul>
              <p>DUDE UP displays a summary of how much each group member should pay to others to settle up</p>
              <h4>What about my data?</h4>
              <p>Your DUDE UP list is stored on your device - no other data is recorded or collected</p>
              <p>Sadly, this means you are not able to share lists with other people or devices...</p>
              <form>
                <button class="du-button du-button--submit" type="submit" autofocus >OK</button>
              </form>
            </div>
          </Accordian>
        )}
      </div>
    )
  }
}

export default connect(null, { addNotification, clear })(AboutAndClear)
