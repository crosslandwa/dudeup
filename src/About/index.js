import React from 'react'
import { connect } from 'react-redux'
import Accordian from '../Accordian'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = { about: false }

    this.openAbout = (e) => {
      e && e.preventDefault()
      this.setState({ about: true })
    }

    this.closeAccordian = () => {
      this.setState({ about: false })
    }
  }

  render () {
    return (
      <React.Fragment>
        <WithFlyoutArrowBelow show={this.state.about}>
          <button class="du-button du-button--flyout" onClick={this.openAbout}>About</button>
        </WithFlyoutArrowBelow>
        {this.state.about && (
          <Accordian closeExplicit={this.closeAccordian} closeImplicit={this.closeAccordian} onSubmit={this.closeAccordian} title="About">
            <>
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
              <button class="du-button du-button--submit" type="submit" autoFocus >OK</button>
            </>
          </Accordian>
        )}
      </React.Fragment>
    )
  }
}

export default connect(null)(About)
