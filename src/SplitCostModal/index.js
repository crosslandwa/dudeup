import React from 'react'
import { connect } from 'react-redux'
import { isModalOpenSelector } from './interactions'
import Modal from '../Modal'
import { RadioList as DudeList } from '../DudeList'

const mapStateToProps = state => ({
  isNonEqualSplit: false,
  isOpen: isModalOpenSelector(state),
  selectedIds: []
})

const SplitCostModal = props => (
  props.isOpen && (
    <Modal onSubmit={console.log} >
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
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
)


/*
TODO:
 - collect selected dudes in local state, dispatch single action on submit (allows user to cancel)
 - prevent submission if no dudes selected
*/

export default connect(mapStateToProps)(SplitCostModal)
