import React from 'react'
import { connect } from 'react-redux'
import { addItem, itemIdsSelector } from './interactions'
import ItemSummary from './ItemSummary'
import { textButtonStyle } from '../styles'

const mapStateToProps = state => ({
  ids: itemIdsSelector(state)
})

const ItemList = props => (
  <React.Fragment>
    <div>
      {props.ids.map(id => <ItemSummary id={id} />)}
    </div>
    <input style={{ ...textButtonStyle, display: 'block' }} type="button" onClick={props.addItem} value="Add item" />
  </React.Fragment>
)

export default connect(mapStateToProps, { addItem })(ItemList)
