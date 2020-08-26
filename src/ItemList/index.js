import React from 'react'
import { connect } from 'react-redux'
import { itemIdsSelector } from './interactions'
import ItemSummary from './ItemSummary'
import EditItemAccordian from './EditItemAccordian'
import { closeAccordian, openAccordian, isAccordianOpen } from '../Accordian/interactions'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state),
  showAccordian: isAccordianOpen(state, 'addItem')
})

const mapDispatchToProps = dispatch => ({
  closeItemAccordion: () => dispatch(closeAccordian()),
  openItemAccordion: () => dispatch(openAccordian('addItem'))
})

class ItemList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { reFocus: false }

    this.toggleAdd = e => {
      this.setState(state => {
        if (this.props.showAccordian) {
          this.closeAddAndRefocus()
        } else {
          this.props.openItemAccordion()
        }
      })
    }

    this.closeAdd = (reFocus = false) => {
      this.props.closeItemAccordion()
      this.setState({ reFocus })
    }

    this.closeAddAndRefocus = () => {
      this.closeAdd(true)
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
    const { ids, showAccordian } = this.props
    return (
      <>
        {ids.map(id => <ItemSummary id={id} />)}
        <button class={`du-button du-button--text-only ${showAccordian ? 'du-flyout--below' : ''}`} ref={this.captureRef} onClick={this.toggleAdd}>
          <span class="du-button__label">Add item</span>
        </button>
        {showAccordian && <EditItemAccordian closeExplicit={this.closeAddAndRefocus} closeImplicit={this.closeAdd} />}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
