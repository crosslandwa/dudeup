import React from 'react'
import { connect } from 'react-redux'
import { clear } from './interactions'
import Accordian from '../Accordian'
import { addNotification } from '../Notifications/interactions'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

class Clear extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showClear: false }

    this.openClear = (e) => {
      e && e.preventDefault()
      this.setState({ showClear: true })
    }

    this.closeAccordian = () => {
      this.setState({ showClear: false })
    }

    this.clear = () => {
      this.props.clear()
      this.props.addNotification('All Dudes and Items have been cleared')
      this.closeAccordian()
    }
  }

  render () {
    return (
      <>
        <WithFlyoutArrowBelow show={this.state.showClear}>
          <button class="du-button du-button--flyout" onClick={this.openClear}>Clear</button>
        </WithFlyoutArrowBelow>
        {this.state.showClear && (
          <div class="du-full-width-container__outer du-full-width-container__outer--overlay">
            <div class="du-full-width-container__inner">
              <Accordian closeExplicit={this.closeAccordian} closeImplicit={this.closeAccordian} onSubmit={this.clear} title="Clear">
                <div class="du-info-text">Clearing will remove all Dudes and Items from your device. Click the Clear button to proceed</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button class="du-button du-button--delete" type="submit">Clear</button>
                  <button autoFocus class="du-button" type="button" onClick={this.closeAccordian}>Cancel</button>
                </div>
                <em>This can not be undone</em>
              </Accordian>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default connect(null, { addNotification, clear })(Clear)
