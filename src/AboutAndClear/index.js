import React from 'react'
import { connect } from 'react-redux'
import { clear } from '../Clear/interactions'
import Accordian from '../Accordian'
import { addNotification } from '../Notifications/interactions'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

class AboutAndClear extends React.Component {
  constructor (props) {
    super(props)
    this.state = { about: false }

    this.openAbout = (e) => {
      e && e.preventDefault()
      this.setState({ about: true, showClear: false })
    }

    this.openClear = (e) => {
      e && e.preventDefault()
      this.setState({ about: false, showClear: true })
    }

    this.closeAccordian = () => {
      this.setState({ about: false, showClear: false })
    }

    this.clear = () => {
      this.props.clear()
      this.props.addNotification('All Dudes and Items have been cleared')
      this.closeAccordian()
    }
  }

  render () {
    return (
      <div>
        <WithFlyoutArrowBelow show={this.state.about}>
          <a class="du-anchor" href="" onClick={this.openAbout}>About</a>
        </WithFlyoutArrowBelow>
        {this.state.about && (
          <Accordian closeExplicit={this.closeAccordian} closeImplicit={this.closeAccordian} onSubmit={this.closeAccordian} title="About">
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
              <button class="du-button du-button--submit" type="submit" autofocus >OK</button>
            </div>
          </Accordian>
        )}
        <WithFlyoutArrowBelow show={this.state.showClear}>
          <a class="du-anchor" href="" onClick={this.openClear}>Clear</a>
        </WithFlyoutArrowBelow>
        {this.state.showClear && (
          <Accordian closeExplicit={this.closeAccordian} closeImplicit={this.closeAccordian} onSubmit={this.clear} title="Clear">
            <div class="du-info-text">Clearing will remove all Dudes and Items from your device. Click the OK button to proceed</div>
            <input autoFocus class="du-button" type="button" value="Cancel" onClick={this.closeAccordian} />
            <button class="du-button du-button--submit" type="submit">OK</button>
            <em>This can not be undone</em>
          </Accordian>
        )}
      </div>
    )
  }
}

export default connect(null, { addNotification, clear })(AboutAndClear)
