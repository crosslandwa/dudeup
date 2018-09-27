import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { CheckBoxList as DudeList } from '../DudeList'
import { itemDescriptionSelector, itemSharedByDudeIdsSelector } from '../ItemList/interactions'

const mapStateToProps = (state, { itemId }) => ({
  isNonEqualSplit: false,
  itemDescription: itemDescriptionSelector(state, itemId),
  selectedIds: itemSharedByDudeIdsSelector(state, itemId)
})

const CostSplitter = props => (
  <Modal onSubmit={console.log} >
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <span>Sharing cost for "{props.itemDescription || <em>a mystery item</em>}"</span>
      <div>
        <label>
          Split equally between
          <input type="radio" checked={!props.isNonEqualSplit} />
        </label>
        <label>
          Split unequally between
          <input type="radio" checked={props.isNonEqualSplit} />
        </label>
      </div>
      <DudeList selectedIds={props.selectedIds}/>
    </div>
  </Modal>
)

/*
TODO:
 - collect selected dudes in local state, dispatch single action on submit (allows user to cancel)
 - prevent submission if no dudes selected
*/

export default connect(mapStateToProps)(CostSplitter)
