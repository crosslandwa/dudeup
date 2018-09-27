import React from 'react'
import { connect } from 'react-redux'
import { isModalOpenSelector, modalItemIdSelector } from './interactions'
import CostSplitter from './CostSplitter'

export default connect(state => ({
  isOpen: isModalOpenSelector(state),
  itemId: modalItemIdSelector(state)
}))(props => props.isOpen && <CostSplitter {...props} />)
