import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import ItemSummary from './ItemSummary'
import EditItemAccordian from './EditItemAccordian'
import AddButton from '../GenericUi/AddButton'
import { WithFlyoutArrowBelow } from '../Accordian/FlyoutArrow'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

class ItemList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { add: false }

    this.toggleAdd = e => {
      this.setState(state => {
        if (state.add) {
          this.closeAddAndRefocus()
        } else {
          return ({ add: !state.add })
        }
      })
    }

    this.closeAdd = (reFocus = false) => {
      this.setState({ add: false, reFocus })
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
    return (
      <React.Fragment>
        <div>
          {this.props.ids.map(id => <ItemSummary id={id} />)}
        </div>
        <WithFlyoutArrowBelow show={this.state.add} >
          <AddButton ref={this.captureRef} label="Add item" onClick={this.toggleAdd} />
        </WithFlyoutArrowBelow>
        {this.state.add && <EditItemAccordian closeExplicit={this.closeAddAndRefocus} closeImplicit={this.closeAdd} />}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, { addItem })(ItemList)
