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
      this.setState(state => ({ add: !state.add }))
    }

    this.closeAdd = e => {
      this.setState({ add: false })
    }
  }

  render () {
    return (
      <React.Fragment>
        <div>
          {this.props.ids.map(id => <ItemSummary id={id} />)}
        </div>
        <WithFlyoutArrowBelow show={this.state.add} >
          <AddButton label="Add item" onClick={this.toggleAdd} />
        </WithFlyoutArrowBelow>
        {this.state.add && <EditItemAccordian close={this.closeAdd} />}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, { addItem })(ItemList)
