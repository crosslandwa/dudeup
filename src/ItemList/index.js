import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import Item from './Item'
import { textButtonStyle } from '../styles'
import RemoveDudeModal from '../RemoveDudeModal'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

class ItemList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modalOpen: false }
    this.closeModal = () => {
      this.setState({ modalOpen: false })
    }
    this.openModal = () => {
      this.setState({ modalOpen: true })
    }
  }

  render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div>
          {this.props.ids.map(id => <Item id={id} />)}
        </div>
        <div>
          <input style={textButtonStyle} type="button" onClick={this.props.addItem} value="Add item" />
          <input style={textButtonStyle} type="button" value="Remove dude" onClick={this.openModal} />
        </div>
        {this.state.modalOpen && <RemoveDudeModal closeModal={this.closeModal} />}
      </div>
    )
  }
}

export default connect(mapStateToProps, { addItem })(ItemList)
