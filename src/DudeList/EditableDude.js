import React from 'react'
import { connect } from 'react-redux'
import { dudeNameSelector } from './interactions'
import EditDudeAccordian from './EditDudeAccordian'

const mapStateToProps = (state, { id }) => ({
  name: dudeNameSelector(state, id)
})

class DudeManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editOpen: false }

    this.toggleEditOpen = e => {
      this.setState(state => {
        if (state.editOpen) {
          this.closeAndRefocus()
        } else {
          return ({ editOpen: !state.editOpen })
        }
      })
    }

    this.close = (reFocus = false) => {
      this.setState({ editOpen: false, reFocus })
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
    const edit = !!this.state.editOpen
    return (
      <div style={{ margin: '0 1em 0.25em 0' }}>
        <button ref={this.captureRef} class={`du-button ${edit ? 'du-flyout--below' : ''}`} onClick={this.toggleEditOpen}>
          <span class="du-button__label du-button__label--name">{this.props.name}</span>
        </button>
        {this.state.editOpen && <EditDudeAccordian id={this.props.id} closeExplicit={this.closeAndRefocus} closeImplicit={this.close} />}
      </div>
    )
  }
}

export default connect(mapStateToProps)(DudeManagement)
