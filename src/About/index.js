import React from 'react'
import { connect } from 'react-redux'
import Accordian from '../Accordian'
import { closeAccordian, openAccordian, isAccordianOpen } from '../Accordian/interactions'

const mapStateToProps = state => ({
  showAbout: isAccordianOpen(state, 'about')
})

const mapDispatchToProps = {
  closeAbout: closeAccordian,
  openAbout: () => openAccordian('about')
}

const About = ({ closeAbout, openAbout, showAbout }) => (
  <>
    <button class={`du-button du-button--text-only du-button--header ${showAbout ? 'du-flyout--below' : ''}`} onClick={openAbout}>
      <span class="du-button__label">About</span>
    </button>
    {showAbout && (
      <div class="du-full-width-container__outer">
        <div class="du-full-width-container__inner">
          <Accordian overlay="true" onClose={closeAbout} onSubmit={closeAbout} title="About">
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
          </Accordian>
        </div>
      </div>
    )}
  </>
)

export default connect(mapStateToProps, mapDispatchToProps)(About)
