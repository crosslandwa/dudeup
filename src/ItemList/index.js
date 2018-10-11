import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import { openModal as openRemoveDudeModal } from '../RemoveDudeModal/interactions'
import Item from './Item'
import { textButtonStyle } from '../styles'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

const ItemList = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div>
      {props.ids.map(id => <Item id={id} />)}
    </div>
    <div>
      <input style={textButtonStyle} type="button" onClick={props.addItem} value="Add item" />
      <input style={textButtonStyle} type="button" value="Remove Dude" onClick={props.openRemoveDudeModal} />
    </div>
  </div>
)

export default connect(mapStateToProps, { addItem, openRemoveDudeModal })(ItemList)
