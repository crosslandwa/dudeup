import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import Item from './Item'
import { textButtonStyle } from '../styles'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

const ItemList = props => (
  <div>
    <div>
      {props.ids.map(id => <Item id={id} />)}
    </div>
    <input style={{ ...textButtonStyle, display: 'block' }} type="button" onClick={props.addItem} value="Add item" />
  </div>
)

export default connect(mapStateToProps, { addItem })(ItemList)
