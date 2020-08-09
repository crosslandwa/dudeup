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
      <div>
        <WithFlyoutArrowBelow show={this.state.showClear}>
          <button class="du-button du-button--text-only" onClick={this.openClear}>Clear</button>
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

export default connect(null, { addNotification, clear })(Clear)
