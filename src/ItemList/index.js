import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import ItemSummary from './ItemSummary'
import EditItemAccordian from './EditItemAccordian'
import { textButtonStyle } from '../styles'
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
          <input style={{ ...textButtonStyle, display: 'block' }} type="button" onClick={this.toggleAdd} value="Add item" />
        </WithFlyoutArrowBelow>
        {this.state.add && <EditItemAccordian close={this.closeAdd} submitButtonText="Add" title="Add item"/>}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, { addItem })(ItemList)
